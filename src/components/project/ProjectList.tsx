"use client";

import { motion } from "framer-motion";

import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectItem } from "@/types/project";

interface ProjectListProps {
  projects: ProjectItem[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-400 mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
          <p className="text-lg">프로젝트가 없습니다</p>
          <p className="text-sm">프로젝트를 추가해보세요!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap gap-6 w-full justify-center"
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="flex-1 min-w-[280px] max-w-[320px] h-[400px] relative group"
        >
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </motion.div>
  );
};
