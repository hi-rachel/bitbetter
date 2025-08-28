"use client";

import React, { useEffect, useState } from "react";

import { quotes } from "@/data/quotes";

const RandomQuoteCard = () => {
  const [currentQuote, setCurrentQuote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // 새로고침시마다 랜덤 명언 변경
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  const handleRefresh = () => {
    setCurrentQuote(getRandomQuote());
  };

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* 순환 아이콘 */}
      <button
        onClick={handleRefresh}
        className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 z-20"
        type="button"
        aria-label="새로운 명언 보기"
      >
        <svg
          className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-8 translate-x-8 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full translate-y-6 -translate-x-6 opacity-60"></div>

      <div className="relative space-y-3">
        {/* 상단 따옴표 */}
        <div className="flex justify-start">
          <div className="text-2xl text-blue-500 opacity-70 font-serif">
            &ldquo;
          </div>
        </div>

        {/* 명언 텍스트 */}
        <blockquote className="text-base text-gray-800 leading-relaxed font-medium italic relative z-10">
          {currentQuote.text}
        </blockquote>

        {/* 저자 */}
        <div className="flex justify-end items-center gap-2">
          <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <cite className="text-xs text-gray-600 font-medium not-italic">
            — {currentQuote.author}
          </cite>
        </div>
      </div>
    </div>
  );
};

export default RandomQuoteCard;
