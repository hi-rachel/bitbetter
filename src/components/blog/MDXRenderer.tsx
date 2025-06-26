"use client";

import React, { useEffect } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

interface MDXRendererProps {
  code: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const MDXRenderer = ({ code }: MDXRendererProps): React.ReactElement => {
  const Component = useMDXComponent(code);

  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4");
    const tocItems: TOCItem[] = [];

    headings.forEach((heading) => {
      const id = heading.id;
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.substring(1));
      if (id && text) tocItems.push({ id, text, level });
    });
  }, [code]);

  const mdxComponents = {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="text-4xl font-extrabold mt-12 mb-6" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="text-3xl font-bold mt-12 mb-5" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="text-2xl font-semibold mt-10 mb-4" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4 className="text-xl font-medium mt-8 mb-3" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className="text-lg leading-8 text-gray-800 dark:text-gray-200 mb-6"
        {...props}
      >
        {children}
      </p>
    ),
    a: ({
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        href={href}
        className="text-blue-600 hover:underline font-medium"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="border-l-4 pl-4 italic text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700 my-6"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code className="rounded px-1.5 py-0.5 text-sm" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="rounded-lg bg-[#282a36] text-white text-sm p-4 overflow-x-auto"
        {...props}
      >
        {children}
      </pre>
    ),
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="list-disc pl-6 my-6 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="list-decimal pl-6 my-6 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="text-lg leading-7" {...props}>
        {children}
      </li>
    ),
    img: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img className="my-6 rounded-lg shadow" {...props} />
    ),
  };

  return (
    <div className="mdx-content text-base leading-relaxed text-foreground dark:text-foreground max-w-full">
      <Component components={mdxComponents} />
    </div>
  );
};

export default MDXRenderer;
