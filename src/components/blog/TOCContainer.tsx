"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TOCContainer = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // 헤딩 요소들에 ID가 있는지 확인하고 추가
    const articleHeadings = document.querySelectorAll(
      "article h1, article h2, article h3, article h4"
    );

    // 헤딩 데이터 수집
    const headingElements = Array.from(articleHeadings) as HTMLHeadingElement[];
    const newHeadings: Heading[] = [];
    const seen = new Set<string>();

    for (const el of headingElements) {
      // ID가 없으면 건너뛰기
      if (!el.id) continue;
      if (seen.has(el.id)) continue;

      seen.add(el.id);
      newHeadings.push({
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName.replace("H", ""), 10),
      });
    }

    setHeadings(newHeadings);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let current: string | null = null;

      for (const el of headingElements) {
        if (el.offsetTop <= scrollPosition) {
          current = el.id;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (headings.length === 0) {
    return (
      <div className="text-sm text-gray-500">목차를 생성할 수 없습니다.</div>
    );
  }

  return (
    <div className="text-sm space-y-2 sticky top-20 overflow-y-auto max-h-[80vh]">
      <div className="font-semibold mb-2 text-gray-700">목차</div>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 1) * 16}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block truncate transition-colors ${
                activeId === heading.id
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TOCContainer;
