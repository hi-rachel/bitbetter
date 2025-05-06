"use client";

import { useState, useEffect, useMemo } from "react";
import { CalendarIcon, TrendingUpIcon } from "lucide-react";
import dynamic from "next/dynamic";

// 클라이언트 사이드에서만 렌더링되도록 동적 임포트
const CompoundGrowthTable = dynamic(() => import("./CompoundGrowthTable"), {
  ssr: false,
});

interface GitHubSummaryStatsProps {
  totalDays: number;
  achievedDays: number;
  streak: number;
}

const GitHubSummaryStats: React.FC<GitHubSummaryStatsProps> = ({
  totalDays,
  achievedDays,
  streak,
}) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  // 클라이언트 사이드 렌더링 감지
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 달성률 계산 - 메모이제이션으로 불필요한 재계산 방지
  const rate = useMemo(() => {
    return totalDays ? ((achievedDays / totalDays) * 100).toFixed(1) : "-";
  }, [totalDays, achievedDays]);

  // 복리 성장 계산 - 메모이제이션으로 불필요한 재계산 방지
  const compoundGrowth = useMemo(() => {
    return ((1 + 0.01) ** streak).toFixed(2);
  }, [streak]);

  // 서버 사이드 렌더링에서의 초기 출력
  if (!isClient) {
    return (
      <div className="mb-4 space-y-1 text-slate-600 text-sm">
        <p>데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="mb-4 space-y-1 text-slate-600 text-sm">
      <p>
        최근 {totalDays}일 중 {achievedDays}일 달성 ({rate}% 달성률)
      </p>
      <p className="flex items-center gap-1">
        <CalendarIcon className="w-4 h-4" /> 연속 기록:{" "}
        <strong>{streak}</strong>일
      </p>
      <p className="flex items-center gap-1">
        <TrendingUpIcon className="w-4 h-4" /> 1% 복리 성장 지수:{" "}
        <strong>{compoundGrowth}</strong>x
        <CompoundGrowthTable />
      </p>
    </div>
  );
};

export default GitHubSummaryStats;
