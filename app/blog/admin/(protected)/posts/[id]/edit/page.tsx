import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostEditor from "@/apps/blog/admin/BlogPostEditor";
import { fetchPostForAuthorEdit } from "@/apps/blog/db/queries";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit post ${id.slice(0, 8)}…`,
    robots: { index: false, follow: false },
  };
}

export default async function BlogAdminEditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await fetchPostForAuthorEdit(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight">
        Edit post
      </h1>
      <BlogPostEditor
        mode="edit"
        postId={post.id}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          status: post.status,
          isFeatured: post.is_featured,
          tagLabels: post.tagSlugs.join(", "),
          coverImagePath: post.cover_image_path,
        }}
      />
    </div>
  );
}
