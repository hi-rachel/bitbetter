"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TOCContainer = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 브라우저 렌더링 후 헤딩 요소들에 ID가 있는지 확인하고 추가
    requestAnimationFrame(() => {
      const articleHeadings = document.querySelectorAll("h1, h2, h3, h4");

      // 헤딩 데이터 수집
      const headingElements = Array.from(
        articleHeadings
      ) as HTMLHeadingElement[];
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
      setActiveId(null); // 페이지 변경 시 활성 헤딩 초기화
    });
  }, [pathname]); // pathname을 의존성으로 추가

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // 헤더 높이 + 여백
      let current: string | null = null;

      // 모든 헤딩 요소를 다시 찾아서 현재 위치 확인
      const currentHeadings = document.querySelectorAll("h1, h2, h3, h4");

      // 페이지 맨 밑에 있는지 확인 (더 큰 여백)
      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 200;

      if (isAtBottom && currentHeadings.length > 0) {
        // 맨 밑에 있으면 마지막 헤딩을 선택
        const lastHeading = currentHeadings[
          currentHeadings.length - 1
        ] as HTMLHeadingElement;
        current = lastHeading.id;
      } else {
        // 일반적인 경우: 스크롤 위치보다 위에 있는 헤딩 중 가장 아래쪽 것을 선택
        for (let i = currentHeadings.length - 1; i >= 0; i--) {
          const element = currentHeadings[i] as HTMLHeadingElement;
          if (element.offsetTop <= scrollPosition) {
            current = element.id;
            break;
          }
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]); // headings가 변경될 때 스크롤 이벤트 리스너 재설정

  const handleHeadingClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 72; // 헤더 높이
      const offset = 20; // 추가 여백
      const elementPosition = element.offsetTop - headerHeight - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="text-sm space-y-2 fixed top-24 right-6 w-56 overflow-y-auto max-h-[calc(100vh-120px)] p-4">
      <div className="font-semibold mb-2 text-gray-700">목차</div>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 1) * 16}px` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleHeadingClick(e, heading.id)}
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
