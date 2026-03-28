-- ─── Contacts table ──────────────────────────────────────────────
-- Stores contact form submissions from the portfolio site.
-- Only the service role (never the browser anon key) can read rows.

CREATE TABLE IF NOT EXISTS public.contacts (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email      text        NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  subject    text        NOT NULL CHECK (char_length(subject) BETWEEN 5 AND 200),
  message    text        NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  read       boolean     NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ─── Row Level Security ───────────────────────────────────────────
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anon (browser) role: INSERT only, no SELECT / UPDATE / DELETE
CREATE POLICY "anon_insert_contacts"
  ON public.contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated users (service role bypasses RLS anyway, this is for
-- any future admin dashboard using the authenticated role)
CREATE POLICY "auth_read_contacts"
  ON public.contacts
  FOR SELECT
  TO authenticated
  USING (true);
