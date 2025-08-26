import BlogLayoutClient from "@/components/blog/BlogLayoutClient";
import BlogPageClient from "@/components/blog/BlogPageClient";

const BlogPage = () => {
  return (
    <BlogLayoutClient>
      <BlogPageClient />
    </BlogLayoutClient>
  );
};

export default BlogPage;
