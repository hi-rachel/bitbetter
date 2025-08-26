"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const CardContainer = ({
  children,
  className,
  containerClassName,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 링크 요소 위에 있을 때는 3D 효과를 적용하지 않음
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.tagName === "A") {
      return;
    }

    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const multiplier = 20;
    const rotateX = (y - 0.5) * multiplier;
    const rotateY = (x - 0.5) * multiplier;

    containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
    e.stopPropagation();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    // 링크 요소 위에 있을 때는 호버 효과를 적용하지 않음
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.tagName === "A") {
      return;
    }

    setIsHovered(true);
    if (containerRef.current) {
      containerRef.current.style.boxShadow =
        "0 0 0 2px transparent, -20px 0 40px rgba(236, 72, 153, 0.2), 20px 0 40px rgba(147, 51, 234, 0.2), 0 0 60px rgba(236, 72, 153, 0.1), 0 0 80px rgba(147, 51, 234, 0.1)";
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsHovered(false);
    containerRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    containerRef.current.style.boxShadow = "0 0 0 1px transparent";
  };

  return (
    <div
      className={cn("flex items-center justify-center", containerClassName)}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex items-center justify-center transition-all duration-200 ease-linear",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 0 0 1px transparent",
          borderRadius: "12px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick(e);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: unknown;
}) => {
  return (
    <Tag
      className={cn("transform transition duration-200 ease-linear", className)}
      style={{
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
