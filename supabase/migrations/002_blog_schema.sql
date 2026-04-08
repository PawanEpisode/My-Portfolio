-- ─── Blog domain: profiles, posts, tags, comments, likes ───────────
-- Run after 001_create_contacts.sql. Apply with Supabase CLI to remote.

-- ─── Enums ─────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'post_status') THEN
    CREATE TYPE public.post_status AS ENUM ('draft', 'published');
  END IF;
END$$;

-- ─── Profiles (1:1 with auth.users) ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text,
  avatar_url   text,
  role         text NOT NULL DEFAULT 'reader' CHECK (role IN ('reader', 'author')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles (role) WHERE role = 'author';

-- ─── Posts ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.posts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id           uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  title               text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 500),
  slug                text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt             text CHECK (excerpt IS NULL OR char_length(excerpt) <= 2000),
  content             jsonb NOT NULL DEFAULT '{}'::jsonb,
  cover_image_path    text CHECK (cover_image_path IS NULL OR char_length(cover_image_path) <= 1024),
  status              public.post_status NOT NULL DEFAULT 'draft',
  published_at        timestamptz,
  read_time_minutes   integer CHECK (read_time_minutes IS NULL OR read_time_minutes >= 0),
  is_featured         boolean NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT posts_publish_rules CHECK (
    status = 'draft'
    OR (status = 'published' AND published_at IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS posts_slug_idx ON public.posts (slug);
CREATE INDEX IF NOT EXISTS posts_published_at_desc_idx ON public.posts (published_at DESC NULLS LAST)
  WHERE status = 'published';
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts (author_id);
CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts (status);

-- ─── Tags + junction ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tags (
  id    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug  text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  label text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id uuid NOT NULL REFERENCES public.posts (id) ON DELETE CASCADE,
  tag_id  uuid NOT NULL REFERENCES public.tags (id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX IF NOT EXISTS post_tags_tag_id_idx ON public.post_tags (tag_id);

-- ─── Comments (threaded) ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comments (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    uuid NOT NULL REFERENCES public.posts (id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  body       text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 10000),
  parent_id  uuid REFERENCES public.comments (id) ON DELETE SET NULL,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS comments_post_id_idx ON public.comments (post_id);
CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON public.comments (parent_id)
  WHERE parent_id IS NOT NULL;

-- ─── Likes (one per user per post) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.post_likes (
  post_id    uuid NOT NULL REFERENCES public.posts (id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

CREATE INDEX IF NOT EXISTS post_likes_post_id_idx ON public.post_likes (post_id);

-- ─── Auto-create profile on signup ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(COALESCE(NEW.email, ''), '@', 1)
    ),
    'reader'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();

-- ─── Touch updated_at ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_touch ON public.profiles;
CREATE TRIGGER profiles_touch
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS posts_touch ON public.posts;
CREATE TRIGGER posts_touch
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS comments_touch ON public.comments;
CREATE TRIGGER comments_touch
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_updated_at();
