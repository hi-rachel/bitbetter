"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ComingSoonPage from "../common/ComingSoonPage";

type NavigationGuardProps = {
  children: ReactNode;
  pendingRoutes: string[];
};

/**
 * NavigationGuard 컴포넌트
 *
 * 특정 경로들에 대해 "준비 중" 페이지를 표시하고, 나머지 경로에 대해서는
 * 정상적인 콘텐츠를 렌더링하는 클라이언트 컴포넌트입니다.
 */
const NavigationGuard = ({ children, pendingRoutes }: NavigationGuardProps) => {
  const pathname = usePathname();

  // 현재 경로가 pendingRoutes 중 하나로 시작하는지 확인
  const isPendingRoute = pendingRoutes.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  return isPendingRoute ? <ComingSoonPage /> : children;
};

export default NavigationGuard;
