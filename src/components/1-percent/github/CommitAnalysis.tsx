"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Trophy, Hash, Star } from "lucide-react";
import StatCard from "./StatCard";
import { ContributionDay, Week } from "@/types/github";

interface DayData {
  name: string;
  commits: number;
  date: string;
}

interface BestDay {
  day: string;
  count: number;
}

interface WeekData {
  week: number;
  contributions: number;
  date: string;
  key: string;
}

interface MonthData {
  month: string;
  contributions: number;
  days: number;
}

interface CommitAnalysisProps {
  weeks: Week[];
  allContributions: ContributionDay[];
  startDate: string;
}

const weekdayLabels = ["월", "화", "수", "목", "금", "토", "일"];

const CommitAnalysis = ({
  weeks,
  allContributions,
  startDate,
}: CommitAnalysisProps) => {
  const [dayData, setDayData] = useState<DayData[]>([]);
  const [bestDay, setBestDay] = useState<BestDay>({ day: "", count: 0 });
  const [totalWeeklyCommits, setTotalWeeklyCommits] = useState<number>(0);
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const [filteredData, setFilteredData] = useState<ContributionDay[]>([]);

  useEffect(() => {
    const allDays: ContributionDay[] = [];
    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.date) allDays.push(day);
      });
    });

    allDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const today = new Date();

    // 이번 주의 월요일 찾기 (한국 기준)
    const monday = new Date(today);
    const day = monday.getDay();
    // 일요일(0)인 경우 6일을 빼면 지난 주 월요일이 됨, 아니면 현재 요일에서 1을 빼고 월요일(1)로부터의 차이를 계산
    monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));

    // 월요일~일요일 생성 (한국식 요일 순서로)
    const weekDays = Array(7)
      .fill(null)
      .map((_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
      });

    // 월~일 순서로 데이터 구성
    const weeklyData: DayData[] = [];
    let weeklyTotal = 0;

    for (let i = 0; i < 7; i++) {
      const d = weekDays[i];
      const dateStr = d.toISOString().split("T")[0];
      const match = allDays.find((day) => day.date === dateStr);
      const formattedDate = `${d.getMonth() + 1}/${d.getDate()}`; // 1/1 형식으로 표시
      const dayIndex = d.getDay() === 0 ? 6 : d.getDay() - 1; // 일요일(0)을 6으로 변환
      const commitCount = match?.contributionCount || 0;

      // 이번 주 총 커밋 수 계산
      weeklyTotal += commitCount;

      weeklyData.push({
        name: weekdayLabels[dayIndex],
        date: formattedDate,
        commits: commitCount,
      });
    }

    setDayData(weeklyData);
    setTotalWeeklyCommits(weeklyTotal);

    // 현재 주간 데이터에서 최고의 커밋 요일 계산 (이번 주만 기준)
    const dayStats: { [key: string]: number } = {
      월: 0,
      화: 0,
      수: 0,
      목: 0,
      금: 0,
      토: 0,
      일: 0,
    };

    // 이번 주 데이터만 사용하여 계산
    weeklyData.forEach((day) => {
      dayStats[day.name] = day.commits;
    });

    // 가장 커밋 수가 많은 요일 찾기
    let maxDay = "";
    let maxCount = 0;

    Object.entries(dayStats).forEach(([day, count]) => {
      if (count > maxCount) {
        maxDay = day;
        maxCount = count;
      }
    });

    // 최고 커밋 요일이 없으면 (모두 0인 경우) 빈 값으로 설정
    if (maxCount === 0) {
      setBestDay({ day: "", count: 0 });
    } else {
      setBestDay({ day: maxDay, count: maxCount });
    }
  }, [weeks]);

  // ProgressChart 데이터 처리
  useEffect(() => {
    const today = new Date();
    const start = new Date(startDate);

    const filtered = allContributions
      .filter((day) => {
        const date = new Date(day.date);
        return date >= start && date <= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredData(filtered);
  }, [allContributions, startDate]);

  // 커스텀 X축 틱 렌더링 함수
  const CustomXAxisTick = (props: {
    x?: number;
    y?: number;
    payload: { value: string; index: number };
  }) => {
    const { x, y, payload } = props;
    const dataItem = dayData[payload.index];

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#64748b"
          fontSize={12}
        >
          {payload.value}
        </text>
        {dataItem && (
          <text
            x={0}
            y={0}
            dy={32}
            textAnchor="middle"
            fill="#64748b"
            fontSize={10}
          >
            {dataItem.date}
          </text>
        )}
      </g>
    );
  };

  // 주간 식별자 생성 함수
  const getWeekIdentifier = (dateStr: string): string => {
    const date = new Date(dateStr);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = Math.floor(
      (date.getTime() - firstDayOfYear.getTime()) / 86400000
    );
    const weekNumber = Math.floor(
      (pastDaysOfYear + firstDayOfYear.getDay()) / 7
    );
    return `${date.getFullYear()}-${weekNumber.toString().padStart(2, "0")}`;
  };

  // 주간 데이터 계산 함수
  const calculateWeeklyData = (): WeekData[] => {
    const weekGroups: Record<
      string,
      { days: ContributionDay[]; firstDay: Date }
    > = {};

    filteredData.forEach((day) => {
      const date = new Date(day.date);
      const key = getWeekIdentifier(day.date);

      if (!weekGroups[key]) {
        weekGroups[key] = { days: [], firstDay: date };
      }
      weekGroups[key].days.push(day);
      if (date < weekGroups[key].firstDay) {
        weekGroups[key].firstDay = date;
      }
    });

    return Object.entries(weekGroups)
      .map(([key, { days, firstDay }], index) => ({
        key,
        week: index + 1,
        contributions: days.reduce((sum, d) => sum + d.contributionCount, 0),
        date: firstDay.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      }))
      .sort((a, b) => a.key.localeCompare(b.key));
  };

  // 월간 데이터 계산 함수
  const calculateMonthlyData = (): MonthData[] => {
    const monthly: Record<string, MonthData> = {};
    filteredData.forEach((d) => {
      const date = new Date(d.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!monthly[key]) {
        monthly[key] = {
          month: date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "short",
          }),
          contributions: 0,
          days: 0,
        };
      }
      monthly[key].contributions += d.contributionCount;
      if (d.contributionCount > 0) monthly[key].days += 1;
    });

    return Object.values(monthly);
  };

  const chartData =
    view === "weekly" ? calculateWeeklyData() : calculateMonthlyData();

  const highest = chartData.length
    ? Math.max(
        ...chartData.map((d) =>
          view === "weekly"
            ? (d as WeekData).contributions
            : (d as MonthData).days
        )
      )
    : 0;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center mb-6">
          <Calendar className="w-5 h-5 mr-2 text-purple-500" />
          커밋 패턴 분석
        </h2>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-slate-700 mb-3">활동 기록</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setView("weekly")}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  view === "weekly"
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                주간
              </button>
              <button
                onClick={() => setView("monthly")}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  view === "monthly"
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                월간
              </button>
            </div>
          </div>

          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey={view === "weekly" ? "date" : "month"}
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [
                    view === "weekly" ? `${value} 커밋` : `${value}일`,
                    view === "weekly" ? "주간 커밋" : "달성 일수",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey={view === "weekly" ? "contributions" : "days"}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6, stroke: "#1e40af", strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-6 text-slate-500">
              선택한 기간에 데이터가 없습니다.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<Star className="w-5 h-5 text-yellow-500" />}
            title="최고의 주간 커밋 기록"
            value={highest.toString()}
            subtext={view === "weekly" ? "커밋" : "일"}
          />

          <StatCard
            icon={<Hash className="w-5 h-5 text-blue-500" />}
            title="이번 주 총 커밋"
            value={totalWeeklyCommits.toString()}
            subtext="회"
          />

          <StatCard
            icon={<Trophy className="w-5 h-5 text-amber-500" />}
            title="이번주 최고의 커밋 요일"
            value={bestDay.day ? `${bestDay.day}요일` : "없음"}
            subtext={bestDay.count > 0 ? `(${bestDay.count}회)` : ""}
          />
        </div>

        <h3 className="font-medium text-slate-700 mb-3">
          이번 주 커밋 현황 (월~일)
        </h3>
        <div className="h-56 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dayData}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tick={CustomXAxisTick}
                height={60}
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value}회`, "커밋 수"]}
              />
              <Bar dataKey="commits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CommitAnalysis;
