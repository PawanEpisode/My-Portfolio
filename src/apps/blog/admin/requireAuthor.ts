import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requireAuthor(): Promise<{ userId: string }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "author") {
    redirect("/admin/login?error=forbidden");
  }

  return { userId: user.id };
}
