"use client";

import { motion } from "framer-motion";

import { Book } from "@/types/book";

import { BookCard } from "./BookCard";

type BookGridProps = {
  books: Book[];
  onSelect: (book: Book) => void;
};

export const BookGrid = ({ books, onSelect }: BookGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {books.length > 0 ? (
        books.map((book) => (
          <motion.div key={book.id} variants={item}>
            <BookCard book={book} onClick={() => onSelect(book)} />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-24 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-lg font-medium">
            이 카테고리에 등록된 책이 없습니다.
          </p>
          <p className="mt-2">다른 카테고리를 확인해보세요.</p>
        </div>
      )}
    </motion.div>
  );
};
