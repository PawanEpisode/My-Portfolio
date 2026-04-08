-- ─── Storage: cover images (path = {user_id}/{filename}) ───────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
DROP POLICY IF EXISTS "blog_covers_public_read" ON storage.objects;
CREATE POLICY "blog_covers_public_read"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'blog-covers');

-- Upload only into folder named after auth uid
DROP POLICY IF EXISTS "blog_covers_authenticated_insert" ON storage.objects;
CREATE POLICY "blog_covers_authenticated_insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'blog-covers'
    AND split_part(name, '/', 1) = auth.uid()::text
  );

DROP POLICY IF EXISTS "blog_covers_owner_update" ON storage.objects;
CREATE POLICY "blog_covers_owner_update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'blog-covers'
    AND split_part(name, '/', 1) = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'blog-covers'
    AND split_part(name, '/', 1) = auth.uid()::text
  );

DROP POLICY IF EXISTS "blog_covers_owner_delete" ON storage.objects;
CREATE POLICY "blog_covers_owner_delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'blog-covers'
    AND split_part(name, '/', 1) = auth.uid()::text
  );
