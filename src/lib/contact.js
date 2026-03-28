import { supabase } from "./supabase";

/**
 * Inserts a contact form submission into the `contacts` table.
 * The anon role is INSERT-only — RLS prevents reads via the browser key.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @throws {Error} Rethrows the Supabase PostgREST error on failure
 */
export async function submitContact({ name, email, subject, message }) {
  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, subject, message });

  if (error) throw error;
}
