"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, books, getBooksByCategory } from "@/data/books";
import { BookGrid } from "@/components/books/BookGrid";
import { BookDetail } from "@/components/books/BookDetail";
import { motion } from "framer-motion";

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );
  const [selectedBook, setSelectedBook] = useState<(typeof books)[0] | null>(
    null
  );

  // 선택된 카테고리에 따라 책 필터링
  const filteredBooks = getBooksByCategory(selectedCategory);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
          <span className="block">Library</span>
        </h1>
        <p className="max-w-xl mx-auto text-base text-gray-500 sm:text-lg md:text-xl md:max-w-3xl">
          읽고 인상 깊었던 책들과 그 속에서 발견한 귀중한 문장들을 모아둔
          공간입니다.
        </p>
      </div>

      <div className="mb-12">
        <Tabs
          defaultValue={categories[0].id}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <div className="flex justify-center">
            <TabsList className="h-14 p-1 bg-white border rounded-xl shadow-sm mb-12 w-auto inline-flex">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="h-12 px-8 text-base font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200 whitespace-nowrap"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BookGrid
                  books={filteredBooks}
                  onSelect={(book) => setSelectedBook(book)}
                />
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

export default BooksPage;
