import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import BitBetterLogo from "./BitBetterLogo";

const ComingSoonPage = () => {
  // 배경 그라데이션 변화를 위한 애니메이션
  const gradientTransition = {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 배경 애니메이션 */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, rgba(99, 102, 241, 0.05), rgba(79, 70, 229, 0.1), rgba(168, 85, 247, 0.05))",
          backgroundSize: "200% 200%",
        }}
        animate={gradientTransition}
      />

      {/* 장식용 원형 */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl bg-indigo-300"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full opacity-20 blur-3xl bg-blue-300"
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 로고 */}
      <motion.div
        className="mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        <BitBetterLogo size="lg" animated={false} />
      </motion.div>

      {/* 메인 컨텐츠 */}
      <motion.div
        className="max-w-lg mx-auto text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          서비스 준비 중입니다
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          더 나은 서비스로 곧 찾아뵙겠습니다
        </p>
      </motion.div>

      {/* 추가 장식 요소 */}
      <motion.div
        className="mt-4 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />

      {/* 푸터 */}
      <motion.div
        className="mt-16 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        &copy; 2025 BitBetter. All rights reserved.
      </motion.div>
    </motion.div>
  );
};

export default ComingSoonPage;
