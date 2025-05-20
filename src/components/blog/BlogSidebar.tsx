import Link from "next/link";

const links = [{ name: "All Posts", path: "/blog" }];

const BlogSidebar = () => {
  return (
    <nav className="space-y-4 text-sm font-medium">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className="text-gray-700 hover:text-indigo-600 block"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default BlogSidebar;
