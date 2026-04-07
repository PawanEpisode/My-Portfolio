declare module "*.css";

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    NEXT_PUBLIC_BLOG_HOSTNAME?: string;
    NEXT_PUBLIC_FRONTEND_HOSTNAME?: string;
    NEXT_PUBLIC_SITE_URL?: string;
  }
}
