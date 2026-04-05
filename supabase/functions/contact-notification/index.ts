import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type InsertPayload = {
  type: "INSERT";
  table: string;
  schema: string;
  record: ContactRecord | null;
  old_record: null;
};

type ContactRecord = {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
  created_at?: string;
};

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildAdminNotificationHtml(record: ContactRecord, siteName: string): string {
  const name = escapeHtml(record.name);
  const email = escapeHtml(record.email);
  const subject = escapeHtml(record.subject);
  const message = escapeHtml(record.message).replaceAll("\n", "<br />");
  const when = record.created_at ? escapeHtml(record.created_at) : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New contact form submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#71717a;">
                ${escapeHtml(siteName)} · Contact form
              </p>
              <h1 style="margin:12px 0 0 0;font-size:22px;line-height:1.3;color:#18181b;">
                New submission
              </h1>
              <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:#3f3f46;">
                Someone submitted the contact form on your site.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;">
              <div style="border:1px solid #e4e4e7;border-radius:10px;padding:16px 18px;background:#fafafa;">
                <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;">Name</p>
                <p style="margin:0 0 14px 0;font-size:15px;line-height:1.5;color:#18181b;">${name}</p>
                <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;">Email</p>
                <p style="margin:0 0 14px 0;font-size:15px;line-height:1.5;color:#18181b;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></p>
                <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;">Subject</p>
                <p style="margin:0 0 14px 0;font-size:15px;line-height:1.5;color:#18181b;">${subject}</p>
                <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;">Message</p>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#3f3f46;">${message}</p>
                ${
                  when
                    ? `<p style="margin:16px 0 0 0;padding-top:14px;border-top:1px solid #e4e4e7;font-size:12px;color:#a1a1aa;">Submitted at (UTC): ${when}</p>`
                    : ""
                }
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type, x-webhook-secret",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  if (webhookSecret) {
    const sent = req.headers.get("x-webhook-secret");
    if (sent !== webhookSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  let body: InsertPayload;
  try {
    body = (await req.json()) as InsertPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (
    body.type !== "INSERT" ||
    body.schema !== "public" ||
    body.table !== "contacts" ||
    !body.record
  ) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const record = body.record;

  const notifyTo = Deno.env.get("NOTIFY_TO_EMAIL")?.trim();
  if (!notifyTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notifyTo)) {
    console.error("NOTIFY_TO_EMAIL is missing or invalid");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    console.error("RESEND_API_KEY is not set");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const from =
    Deno.env.get("RESEND_FROM_EMAIL")?.trim() || "Portfolio <onboarding@resend.dev>";
  const siteName = Deno.env.get("SITE_NAME")?.trim() || "Portfolio";

  const subject = `[${siteName}] Contact: ${record.subject}`.slice(0, 998);
  const html = buildAdminNotificationHtml(record, siteName);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [notifyTo],
      reply_to: record.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", res.status, errText);
    return new Response(
      JSON.stringify({ error: "Failed to send email", detail: errText }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
