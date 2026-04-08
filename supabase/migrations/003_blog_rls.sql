-- ─── Row Level Security: blog tables ───────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- ─── Profiles ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "profiles_select_public" ON public.profiles;
CREATE POLICY "profiles_select_public"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ─── Posts ────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "posts_select_visible" ON public.posts;
CREATE POLICY "posts_select_visible"
  ON public.posts
  FOR SELECT
  TO anon, authenticated
  USING (
    status = 'published'
    OR (auth.uid() IS NOT NULL AND author_id = auth.uid())
  );

DROP POLICY IF EXISTS "posts_insert_author" ON public.posts;
CREATE POLICY "posts_insert_author"
  ON public.posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'author'
    )
  );

DROP POLICY IF EXISTS "posts_update_author" ON public.posts;
CREATE POLICY "posts_update_author"
  ON public.posts
  FOR UPDATE
  TO authenticated
  USING (
    author_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'author'
    )
  )
  WITH CHECK (
    author_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'author'
    )
  );

DROP POLICY IF EXISTS "posts_delete_author" ON public.posts;
CREATE POLICY "posts_delete_author"
  ON public.posts
  FOR DELETE
  TO authenticated
  USING (
    author_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'author'
    )
  );

-- ─── Tags ─────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "tags_select_all" ON public.tags;
CREATE POLICY "tags_select_all"
  ON public.tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "tags_insert_author" ON public.tags;
CREATE POLICY "tags_insert_author"
  ON public.tags
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role = 'author'
    )
  );

-- ─── post_tags ────────────────────────────────────────────────────
DROP POLICY IF EXISTS "post_tags_select_visible" ON public.post_tags;
CREATE POLICY "post_tags_select_visible"
  ON public.post_tags
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.posts po
      WHERE po.id = post_tags.post_id
        AND (
          po.status = 'published'
          OR (auth.uid() IS NOT NULL AND po.author_id = auth.uid())
        )
    )
  );

DROP POLICY IF EXISTS "post_tags_insert_author" ON public.post_tags;
CREATE POLICY "post_tags_insert_author"
  ON public.post_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.posts po
      WHERE po.id = post_tags.post_id
        AND po.author_id = auth.uid()
        AND EXISTS (
          SELECT 1
          FROM public.profiles p
          WHERE p.id = auth.uid()
            AND p.role = 'author'
        )
    )
  );

DROP POLICY IF EXISTS "post_tags_delete_author" ON public.post_tags;
CREATE POLICY "post_tags_delete_author"
  ON public.post_tags
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.posts po
      WHERE po.id = post_tags.post_id
        AND po.author_id = auth.uid()
    )
  );

-- ─── Comments ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "comments_select_on_published" ON public.comments;
CREATE POLICY "comments_select_on_published"
  ON public.comments
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.posts po
      WHERE po.id = comments.post_id
        AND po.status = 'published'
    )
  );

DROP POLICY IF EXISTS "comments_insert_authenticated" ON public.comments;
CREATE POLICY "comments_insert_authenticated"
  ON public.comments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.posts po
      WHERE po.id = comments.post_id
        AND po.status = 'published'
    )
    AND (
      parent_id IS NULL
      OR EXISTS (
        SELECT 1
        FROM public.comments c
        WHERE c.id = comments.parent_id
          AND c.post_id = comments.post_id
      )
    )
  );

DROP POLICY IF EXISTS "comments_update_own" ON public.comments;
CREATE POLICY "comments_update_own"
  ON public.comments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "comments_delete_own_or_post_author" ON public.comments;
CREATE POLICY "comments_delete_own_or_post_author"
  ON public.comments
  FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1
      FROM public.posts po
      WHERE po.id = comments.post_id
        AND po.author_id = auth.uid()
    )
  );

-- ─── Likes ────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "post_likes_select_all" ON public.post_likes;
CREATE POLICY "post_likes_select_all"
  ON public.post_likes
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "post_likes_insert_own" ON public.post_likes;
CREATE POLICY "post_likes_insert_own"
  ON public.post_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "post_likes_delete_own" ON public.post_likes;
CREATE POLICY "post_likes_delete_own"
  ON public.post_likes
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ─── Prevent clients from escalating profile role ─────────────────
CREATE OR REPLACE FUNCTION public.prevent_profile_role_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'profile role cannot be changed via API';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_role_immutable ON public.profiles;
CREATE TRIGGER profiles_role_immutable
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_profile_role_escalation();
