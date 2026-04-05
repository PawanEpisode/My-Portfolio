import { supabase } from "./supabase";

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Inserts a contact form submission into the `contacts` table.
 * The anon role is INSERT-only — RLS prevents reads via the browser key.
 */
export async function submitContact({
  name,
  email,
  subject,
  message,
}: ContactSubmission): Promise<void> {
  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, subject, message });

  if (error) throw error;
}
