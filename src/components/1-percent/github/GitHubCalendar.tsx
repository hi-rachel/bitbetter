import { useState } from "react";

import { ContributionDay, Week } from "@/types/github";

interface GitHubCalendarProps {
  weeks: Week[];
  year: number;
}

const GitHubCalendar: React.FC<GitHubCalendarProps> = ({ weeks, year }) => {
  const [hovered, setHovered] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getContributionColor = (count: number): string => {
    if (count === 0) return "bg-[#F2F2F2]";
    if (count < 3) return "bg-[#FDE2E4]";
    if (count < 6) return "bg-[#FABEBE]";
    if (count < 9) return "bg-[#C084FC]";
    return "bg-[#A259FF]";
  };

  const formatHoverText = (day: ContributionDay): string => {
    const date = new Date(day.date);
    return `${day.contributionCount} contribution${
      day.contributionCount !== 1 ? "s" : ""
    } on ${date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })}`;
  };

  if (weeks.length === 0) {
    return <p className="text-slate-500 text-sm">No activity in this year.</p>;
  }

  // 현재 날짜 구하기
  const currentDate = new Date();

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-700 mb-2">
        {year} GitHub 활동 캘린더
      </h2>

      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* 월 표시 영역 제거 */}
          <div className="flex text-xs text-slate-500 pl-8 mb-1">
            {/* 월 레이블 대신 빈 공간 유지 */}
            {weeks.map((_, weekIndex) => (
              <div key={weekIndex} className="w-4 text-center" />
            ))}
          </div>

          <div className="flex">
            {/* 요일 레이블 */}
            <div className="flex flex-col text-xs text-slate-500 mr-1 w-8">
              {weekdayLabels.map((label, i) => (
                <div key={label} className="h-4 mb-1 text-right pr-1">
                  {i % 2 === 0 ? label : ""}
                </div>
              ))}
            </div>

            {/* 주차별 렌더링 */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1 mr-1">
                {week.contributionDays.map((day, dayIndex) => {
                  if (!day.date || new Date(day.date) > currentDate)
                    return (
                      <div
                        key={dayIndex}
                        className="w-4 h-4 rounded-sm bg-transparent"
                      />
                    );

                  return (
                    <div
                      key={dayIndex}
                      className={`w-4 h-4 rounded-sm transition-colors ${getContributionColor(
                        day.contributionCount
                      )} hover:ring-1 hover:ring-indigo-400`}
                      onMouseEnter={(e) => {
                        const rect = (
                          e.target as HTMLElement
                        ).getBoundingClientRect();
                        setHovered({
                          day,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {hovered && (
        <div
          className="fixed z-50 text-white bg-black text-xs px-3 py-1 rounded-md pointer-events-none"
          style={{ top: hovered.y - 40, left: hovered.x - 60 }}
        >
          {formatHoverText(hovered.day)}
        </div>
      )}

      <div className="mt-3 flex justify-start items-center text-xs text-slate-500">
        <span className="mr-2">Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-[#F2F2F2]" />
          <div className="w-3 h-3 rounded-sm bg-[#FDE2E4]" />
          <div className="w-3 h-3 rounded-sm bg-[#FABEBE]" />
          <div className="w-3 h-3 rounded-sm bg-[#C084FC]" />
          <div className="w-3 h-3 rounded-sm bg-[#A259FF]" />
        </div>
        <span className="ml-2">More</span>
      </div>
    </div>
  );
};

export default GitHubCalendar;
