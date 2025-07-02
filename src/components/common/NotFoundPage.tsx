"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowLeft, Ghost } from "lucide-react";

import BitBetterLogo from "./BitBetterLogo";

const NotFoundPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 배경 장식 */}
      <motion.div
        className="absolute top-1/4 right-1/5 w-56 h-56 rounded-full opacity-20 blur-3xl bg-indigo-300"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full opacity-20 blur-3xl bg-blue-300"
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 컨텐츠 컨테이너 */}
      <div className="relative z-10 max-w-md w-full bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-indigo-100">
        {/* 로고 */}
        <div className="mb-8 flex justify-center">
          <BitBetterLogo size="md" />
        </div>

        {/* 404 텍스트 */}
        <motion.div
          className="mb-4 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2">
            404
          </h1>
          <h2 className="text-2xl font-medium text-indigo-800 mb-1">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600">
            요청하신 페이지가 이동되었거나 더 이상 존재하지 않습니다.
          </p>
        </motion.div>

        {/* 길 잃은 핀 아이콘 */}
        <motion.div
          className="my-8 flex justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-4 bg-indigo-100 rounded-full text-indigo-600">
            <Ghost size={32} />
          </div>
        </motion.div>

        {/* 홈으로 돌아가기 버튼 */}
        <motion.div
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={16} />
              홈으로 돌아가기
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* 푸터 */}
      <motion.div
        className="mt-8 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        &copy; {new Date().getFullYear()} BitBetter. All rights reserved.
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
