-- Allow authors to UPDATE tags so upsert (ON CONFLICT DO UPDATE) works.
-- INSERT-only policy caused 42501 when saving posts with existing tag slugs.

DROP POLICY IF EXISTS "tags_update_author" ON public.tags;
CREATE POLICY "tags_update_author"
  ON public.tags
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'author'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'author'
    )
  );
