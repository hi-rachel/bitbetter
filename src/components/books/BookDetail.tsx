"use client";

import { useState } from "react";
import Image from "next/image";

import { AnimatePresence,motion } from "framer-motion";
import { BookOpen, MessageSquare } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, BookHighlight } from "@/types/book";

type BookDetailProps = {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
};

export const BookDetail = ({ book, isOpen, onClose }: BookDetailProps) => {
  const [activeTab, setActiveTab] = useState<string>("info");
  const totalQuotes = book.highlights.reduce(
    (total, highlight) => total + highlight.quotes.length,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden border-0 w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white">
        <div className="flex flex-col md:flex-row h-full">
          {/* 왼쪽 이미지 섹션 - 모바일에서는 높이 제한, 데스크탑에서는 넓은 공간 */}
          <div className="overflow-hidden md:w-5/12 lg:w-4/12 bg-gradient-to-b from-gray-100 to-white p-6 md:p-8 lg:p-12 flex items-center justify-center relative border-gray-300 border-b-1 border-r-1">
            <div className="w-full max-w-xs mx-auto max-h-[35vh] md:max-h-none">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 30vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 오른쪽 내용 섹션 */}
          <div className="mt-1 md:w-7/12 lg:w-8/12 p-6 md:p-8 lg:p-10 overflow-y-auto max-h-[55vh] md:max-h-[95vh]">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight">
                {book.title}
              </DialogTitle>
              <p className="text-gray-500 mt-2 text-base md:text-lg">
                {book.author} · {book.publisher} · {book.publishedYear}
              </p>
            </DialogHeader>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="flex w-full h-12 md:h-14 bg-gray-100 rounded-lg p-1">
                <TabsTrigger
                  value="info"
                  className="flex-1 rounded-md h-10 md:h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center space-x-2 transition-all"
                >
                  <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-medium">책 정보</span>
                </TabsTrigger>
                <TabsTrigger
                  value="highlights"
                  className="flex-1 rounded-md h-10 md:h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center space-x-2 transition-all"
                >
                  <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-medium">내 기록 ({totalQuotes})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-6 md:mt-8">
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                      저자
                    </h4>
                    <p className="text-gray-700">{book.author}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                      출판사
                    </h4>
                    <p className="text-gray-700">{book.publisher}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                      출판년도
                    </h4>
                    <p className="text-gray-700">{book.publishedYear}</p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setActiveTab("highlights")}
                      className="inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 md:h-5 md:w-5 mr-2" />내 기록
                      보기
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="highlights"
                className="mt-6 md:mt-8 pb-6 md:pb-8"
              >
                <AnimatePresence>
                  {book.highlights.length > 0 ? (
                    <motion.div
                      className="space-y-6 md:space-y-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {book.highlights.map((highlight, index) => (
                        <HighlightCard
                          key={index}
                          highlight={highlight}
                          index={index}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-10 md:py-16">
                      <BookOpen className="h-10 w-10 md:h-12 md:w-12 mx-auto text-gray-300 mb-3 md:mb-4" />
                      <h3 className="text-lg md:text-xl font-medium text-gray-500 mb-2">
                        아직 기록된 내용이 없습니다
                      </h3>
                      <p className="text-gray-400">
                        인상 깊은 문장이나 생각을 기록해보세요.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type HighlightCardProps = {
  highlight: BookHighlight;
  index: number;
};

const HighlightCard = ({ highlight, index }: HighlightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-sm"
    >
      <div className="flex items-center mb-4 md:mb-5">
        <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-primary" />
        </div>
        <h3 className="font-medium text-base md:text-lg">
          {highlight.chapter}
        </h3>
      </div>

      <div className="space-y-5 md:space-y-6">
        {highlight.quotes.map((quote, quoteIndex) => (
          <div key={quoteIndex} className="space-y-3 md:space-y-4">
            <div className="pl-3 md:pl-4 border-l-4 border-primary py-3 md:py-4 bg-white rounded-r-lg">
              <p className="italic text-gray-700 text-sm md:text-base whitespace-pre-line leading-relaxed">
                {quote.text}
              </p>
            </div>

            {quote.comments && quote.comments.length > 0 && (
              <div className="space-y-2 md:space-y-3 ml-4">
                {quote.comments.map((comment, commentIndex) => (
                  <div
                    key={commentIndex}
                    className="flex items-start gap-2 md:gap-3 bg-white p-3 md:p-4 rounded-lg"
                  >
                    <MessageSquare className="h-4 w-4 md:h-5 md:w-5 mt-1 text-gray-400 shrink-0" />
                    <p className="text-gray-600 text-sm md:text-base whitespace-pre-line leading-relaxed">
                      {comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
