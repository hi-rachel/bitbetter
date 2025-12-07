"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { ProjectList } from "@/components/project/ProjectList";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { projects } from "@/data/projects";

const ProjectPage = () => {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto z-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              <span className="block bg-gradient-to-r from-blue-600 via-purple-700 to-violet-800 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x pb-1">
                Projects
              </span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              그동안 개발한 프로젝트들을 모았습니다.
              <br />각 프로젝트의 서비스 링크와 GitHub 저장소를 확인해 보세요!
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link
                href="mailto:rachel.uiux@gmail.com"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-500" />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  협업 문의하기
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Project List */}
          <ProjectList projects={projects} />

          {/* Troubleshooting Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-end mt-12 mb-8"
          >
            <Link
              href="https://hi-rachel.oopy.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              <span className="text-sm font-medium text-gray-600">
                자세한 트러블 슈팅 내용 보러가기
              </span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default ProjectPage;
