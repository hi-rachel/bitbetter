"use client";

import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
  onClick: () => void;
};

export const BookCard = ({ book, onClick }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      className="group h-full bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      <div className="p-4">
        <div className="relative aspect-[2/3] mb-5 overflow-hidden rounded-lg">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="text-white font-medium px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-sm">
              자세히 보기
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
          {book.title}
        </h3>

        <p className="text-gray-600 line-clamp-1 mb-4">{book.author}</p>

        <div className="flex items-center justify-between mt-auto">
          <Badge variant="outline" className="px-3 py-1 font-medium">
            {book.publishedYear}
          </Badge>

          <div className="flex items-center text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>{book.highlights.length}개의 기록</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
