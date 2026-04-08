import type { Metadata } from "next";
import BlogPostEditor from "@/apps/blog/admin/BlogPostEditor";
import { emptyTiptapDoc } from "@/apps/blog/db/queries";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export default function BlogAdminNewPostPage() {
  return (
    <div>
      <h1 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight">
        New post
      </h1>
      <BlogPostEditor
        mode="create"
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          content: emptyTiptapDoc(),
          status: "draft",
          isFeatured: false,
          tagLabels: "",
          coverImagePath: null,
        }}
      />
    </div>
  );
}
