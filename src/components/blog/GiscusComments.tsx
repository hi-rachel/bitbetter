"use client";

import { useEffect } from "react";

interface GiscusCommentsProps {
  theme?: "light" | "dark";
}

const GiscusComments = ({ theme = "light" }: GiscusCommentsProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "hi-rachel/bitbetter");
    script.setAttribute("data-repo-id", "R_kgDOOjTCnw");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDOOjTCn84CuqhU");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const giscusContainer = document.getElementById("giscus-container");
    if (giscusContainer) {
      giscusContainer.appendChild(script);
    }

    return () => {
      if (giscusContainer) {
        giscusContainer.innerHTML = "";
      }
    };
  }, [theme]);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">댓글</h3>
        <p className="text-sm text-gray-600">
          GitHub 계정으로 댓글을 남겨보세요!
        </p>
      </div>
      <div id="giscus-container" />
    </div>
  );
};

export default GiscusComments;
