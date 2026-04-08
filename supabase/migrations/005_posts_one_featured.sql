-- At most one published-featured spotlight post (optional enforcement)
CREATE UNIQUE INDEX IF NOT EXISTS posts_one_featured_at_a_time
  ON public.posts ((true))
  WHERE is_featured;
