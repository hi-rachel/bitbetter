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
      <h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-5 md:mb-6"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mt-6 sm:mt-8 md:mt-12 mb-3 sm:mb-4 md:mb-5"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="text-lg sm:text-xl md:text-2xl font-semibold mt-5 sm:mt-6 md:mt-10 mb-2 sm:mb-3 md:mb-4"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
        className="text-base sm:text-lg md:text-xl font-medium mt-4 sm:mt-5 md:mt-8 mb-2 sm:mb-2 md:mb-3"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-gray-800 mb-4 sm:mb-5 md:mb-6"
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
        className="text-blue-600 hover:underline font-medium text-sm sm:text-base"
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
        className="border-l-4 pl-3 sm:pl-4 italic text-sm sm:text-base text-gray-600 border-gray-300 my-4 sm:my-5 md:my-6"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className="rounded px-1 sm:px-1.5 py-0.5 text-xs sm:text-sm"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="rounded-lg bg-[#282a36] text-white text-xs sm:text-sm p-3 sm:p-4 overflow-x-auto my-4 sm:my-5 md:my-6"
        {...props}
      >
        {children}
      </pre>
    ),
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className="list-disc pl-4 sm:pl-6 my-4 sm:my-5 md:my-6 space-y-1 sm:space-y-2"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className="list-decimal pl-4 sm:pl-6 my-4 sm:my-5 md:my-6 space-y-1 sm:space-y-2"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li
        className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7"
        {...props}
      >
        {children}
      </li>
    ),
    img: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img
        className="my-4 sm:my-5 md:my-6 rounded-lg shadow max-w-full h-auto"
        {...props}
      />
    ),
    table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto my-4 sm:my-5 md:my-6">
        <table
          className="min-w-full border-collapse text-xs sm:text-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <th
        className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 text-left font-semibold"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <td
        className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2"
        {...props}
      >
        {children}
      </td>
    ),
  };

  return (
    <div className="mdx-content text-sm sm:text-base leading-relaxed text-foreground max-w-full overflow-x-hidden">
      <Component components={mdxComponents} />
    </div>
  );
};

export default MDXRenderer;
