"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CardBody, CardContainer, CardItem } from "@/components/ui/Card3D";
import { ProjectItem } from "@/types/project";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

// 연도별 색상 매핑 함수
const getYearColorClasses = (year: number) => {
  const yearColors: Record<
    number,
    { bg: string; text: string; border: string }
  > = {
    2020: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
    2021: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      border: "border-orange-200",
    },
    2022: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-200",
    },
    2023: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200",
    },
    2024: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
    },
    2025: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-200",
    },
    2026: {
      bg: "bg-teal-100",
      text: "text-teal-700",
      border: "border-teal-200",
    },
    2027: {
      bg: "bg-cyan-100",
      text: "text-cyan-700",
      border: "border-cyan-200",
    },
    2028: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200" },
    2029: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    2030: {
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      border: "border-indigo-200",
    },
  };

  // 매핑된 연도가 있으면 반환, 없으면 모듈러 연산으로 색상 할당
  if (yearColors[year]) {
    return yearColors[year];
  }

  // 기본 색상 팔레트 (매핑되지 않은 연도용)
  const defaultColors = [
    {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-200",
    },
    { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
    { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
    {
      bg: "bg-violet-100",
      text: "text-violet-700",
      border: "border-violet-200",
    },
  ];

  const colorIndex = Math.abs(year) % defaultColors.length;
  return defaultColors[colorIndex];
};

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const yearColors = getYearColorClasses(project.startYear);
  const [imageError, setImageError] = useState(false);

  return (
    <CardContainer
      className="w-full h-[400px] cursor-pointer"
      containerClassName="w-full h-[400px]"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        window.open(project.serviceUrl, "_blank", "noopener,noreferrer");
      }}
    >
      <CardBody className="w-full h-[400px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group/card relative pointer-events-auto">
        {/* Year Tag */}
        <div className="absolute bottom-4 right-4 z-10">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${yearColors.bg} ${yearColors.text} border ${yearColors.border} shadow-sm`}
          >
            {project.startYear}
          </span>
        </div>

        {/* Thumbnail */}
        <CardItem translateZ={50} className="relative group">
          <div className="w-full h-48 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {project.image && !imageError ? (
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority={index < 2}
                quality={95}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl opacity-30">🚀</div>
              </div>
            )}
          </div>
        </CardItem>

        {/* Content */}
        <CardItem translateZ={100} className="p-6 flex flex-col h-full">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
            {project.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4.5rem]">
            {project.description}
          </p>

          {/* GitHub Link */}
          <div className="mb-4">
            {project.githubUrl ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 text-gray-400 font-medium text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Private
              </div>
            )}
          </div>

          {/* Service Link */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
            <Link
              href={project.serviceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              서비스 보기
            </Link>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};
