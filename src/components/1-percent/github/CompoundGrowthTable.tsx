"use client";

import { useEffect, useState } from "react";

import { Info } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

interface GrowthData {
  year: number;
  days: number;
  growth: string;
}

// 고정된 성장 데이터 (서버/클라이언트 불일치 방지를 위해 정적으로 선언)
const growthData: GrowthData[] = [
  { year: 1, days: 365, growth: "37.78배" },
  { year: 2, days: 730, growth: "1,426.5배" },
  { year: 3, days: 1095, growth: "53,837배" },
  { year: 5, days: 1825, growth: "1,625,542배" },
  { year: 10, days: 3650, growth: "264,891,221,000배" },
];

const CompoundGrowthTable: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  // 클라이언트 사이드 렌더링 감지
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 서버 사이드 렌더링 시 간소화된 UI 제공
  if (!isClient) {
    return (
      <button className="ml-1">
        <Info className="w-4 h-4 text-slate-400" />
      </button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="ml-1">
          <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 transition" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] text-sm p-4 rounded-md shadow-xl border bg-white">
        <p className="mb-3 font-semibold text-slate-800">
          매일 1% 성장하면, 얼마나 쌓일까요?
        </p>
        <table className="w-full border-collapse text-left">
          <thead className="text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-2">기간</th>
              <th className="py-2 text-right">일수</th>
              <th className="py-2 text-right">복리 성장</th>
            </tr>
          </thead>
          <tbody>
            {growthData.map(({ year, days, growth }) => (
              <tr key={year} className="text-slate-700">
                <td className="py-1">{year}년</td>
                <td className="py-1 text-right">{days.toLocaleString()}일</td>
                <td className="py-1 text-right font-medium">{growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-slate-700 leading-relaxed text-[13px]">
          작지만 꾸준한 변화는 결국 폭발적인 성장을 만듭니다.
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default CompoundGrowthTable;
