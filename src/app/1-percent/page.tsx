"use client";

import { useEffect, useState } from "react";
import { fetchGitHubContributions } from "@/lib/github-graphql";
import GitHubCalendar from "@/components/1-percent/github/GitHubCalendar";
import GitHubSummaryStats from "@/components/1-percent/github/GithubSummaryStats";
import ImprovementGoals from "@/components/1-percent/github/ImprovementGoals";
import { Github, TrendingUp, User, BookOpen } from "lucide-react";
import CommitAnalysis from "@/components/1-percent/github/CommitAnalysis";
import { ContributionDay, Week } from "@/types/github";
import { DEFAULT_START_DATE, DEFAULT_USERNAME } from "@/constants/github";
import StatCard from "@/components/1-percent/github/StatCard";

type TabType = "dashboard" | "analysis" | "goals";

const OnePercentPage = () => {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [allContributions, setAllContributions] = useState<ContributionDay[]>(
    []
  );
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [totalDays, setTotalDays] = useState(0);
  const [achievedDays, setAchievedDays] = useState(0);
  const [streak, setStreak] = useState(0);
  const [prevStreak, setPrevStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const [username, setUsername] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_USERNAME;
    return localStorage.getItem("githubUsername") || DEFAULT_USERNAME;
  });
  const [usernameInput, setUsernameInput] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_USERNAME;
    return localStorage.getItem("githubUsername") || DEFAULT_USERNAME;
  });

  const [startDate, setStartDate] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_START_DATE;
    return localStorage.getItem("startDate") || DEFAULT_START_DATE;
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let combined: ContributionDay[] = [];
        let earliestYear = new Date().getFullYear();
        for (let year = 2025; year >= 2010; year--) {
          const data = await fetchGitHubContributions(username, year);
          if (data.some((d) => d.contributionCount > 0)) {
            combined = [...data, ...combined];
            earliestYear = year;
          }
        }
        combined.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setAllContributions(combined);

        // 연도 범위 계산
        const currentYear = new Date().getFullYear();
        const availableYears = [];
        for (let y = currentYear; y >= earliestYear; y--) {
          availableYears.push(y);
        }
        setYears(availableYears);
        setSelectedYear(currentYear);
      } catch (err) {
        console.error("GitHub 데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [username]);

  useEffect(() => {
    const today = new Date();
    const start = new Date(startDate);
    const recent = allContributions.filter((d) => {
      const date = new Date(d.date);
      return date >= start && date <= today;
    });

    const achieved = recent.filter((d) => d.contributionCount > 0);
    setTotalDays(recent.length);
    setAchievedDays(achieved.length);

    let currentStreak = 0;
    let previousStreak = 0;
    for (let i = recent.length - 1; i >= 0; i--) {
      if (recent[i].contributionCount > 0) {
        currentStreak++;
      } else {
        for (let j = i; j >= 0; j--) {
          if (recent[j].contributionCount > 0) previousStreak++;
          else break;
        }
        break;
      }
    }
    setStreak(currentStreak);
    setPrevStreak(previousStreak);
  }, [allContributions, startDate]);

  useEffect(() => {
    const filtered = allContributions.filter((d) =>
      d.date.startsWith(`${selectedYear}-`)
    );
    const yearStart = new Date(`${selectedYear}-01-01`);
    const yearEnd = new Date(`${selectedYear}-12-31`);
    const padded: ContributionDay[] = [];

    for (
      let date = new Date(yearStart);
      date <= yearEnd;
      date.setDate(date.getDate() + 1)
    ) {
      const dateStr = date.toISOString().split("T")[0];
      const match = filtered.find((d) => d.date === dateStr);
      padded.push({
        date: dateStr,
        contributionCount: match?.contributionCount ?? 0,
      });
    }

    const structuredWeeks: Week[] = [];
    let week: ContributionDay[] = [];

    for (let i = 0; i < padded.length; i++) {
      const day = padded[i];
      const date = new Date(day.date);
      const weekday = date.getDay();

      if (week.length === 0 && weekday !== 0) {
        for (let j = 0; j < weekday; j++) {
          week.push({ date: "", contributionCount: 0 });
        }
      }

      week.push(day);

      if (week.length === 7) {
        structuredWeeks.push({ contributionDays: week });
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ date: "", contributionCount: 0 });
      }
      structuredWeeks.push({ contributionDays: week });
    }

    setWeeks(structuredWeeks);
  }, [selectedYear, allContributions]);

  const calculateCompoundGrowth = (n: number, r: number = 0.01): string => {
    return ((1 + r) ** n).toFixed(2);
  };

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-slate-50 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* 상단 설정 */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              1% Everyday Better
            </h1>
            <p className="text-slate-600 mt-1">
              당신의 성장 여정을 기록하세요.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-start">
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setUsername(usernameInput);
                  localStorage.setItem("githubUsername", usernameInput);
                }
              }}
              placeholder="GitHub ID"
              className="border px-2 py-1 text-sm rounded-md"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                const newDate = e.target.value;
                setStartDate(newDate);
                localStorage.setItem("startDate", newDate);
              }}
              className="border px-2 py-1 text-sm rounded-md"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500">GitHub 데이터를 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <>
            {/* 탭 */}
            <div className="border-b border-slate-200 mb-4">
              <nav className="flex space-x-8">
                {(["dashboard", "analysis", "goals"] as TabType[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 inline-flex items-center text-sm font-medium border-b-2 -mb-px ${
                        activeTab === tab
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {tab === "dashboard"
                        ? "대시보드"
                        : tab === "analysis"
                        ? "상세 분석"
                        : "목표 관리"}
                    </button>
                  )
                )}
              </nav>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 mb-8">
              {activeTab === "dashboard" && (
                <>
                  <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6">
                    <StatCard
                      icon={<Github className="w-5 h-5 text-indigo-500" />}
                      title="연속 커밋"
                      value={`${streak}일`}
                      subtext={
                        prevStreak > 0 ? `이전 연속 ${prevStreak}일` : undefined
                      }
                      bgColor="bg-indigo-50"
                      textColor="text-indigo-600"
                    />
                    <StatCard
                      icon={<BookOpen className="w-5 h-5 text-amber-500" />}
                      title="복리 성장"
                      value={`${calculateCompoundGrowth(streak)}x`}
                      bgColor="bg-amber-50"
                      textColor="text-amber-600"
                    />
                    <StatCard
                      icon={<TrendingUp className="w-5 h-5 text-green-500" />}
                      title="달성률"
                      value={`${((achievedDays / totalDays) * 100).toFixed(
                        1
                      )}%`}
                      subtext={`총 ${totalDays}일 중 ${achievedDays}일`}
                      bgColor="bg-green-50"
                      textColor="text-green-600"
                    />
                    <StatCard
                      icon={<User className="w-5 h-5 text-blue-500" />}
                      title="일일 평균"
                      value={`${(achievedDays / (totalDays / 7)).toFixed(1)}일`}
                      subtext="주 평균"
                      bgColor="bg-blue-50"
                      textColor="text-blue-600"
                    />
                  </div>

                  <GitHubSummaryStats
                    totalDays={totalDays}
                    achievedDays={achievedDays}
                    streak={streak}
                  />

                  <div className="relative mt-6 flex gap-4">
                    <div className="min-w-[800px] overflow-x-auto">
                      <GitHubCalendar weeks={weeks} year={selectedYear} />
                    </div>
                    <div className="flex flex-col gap-2">
                      {years.map((y) => (
                        <button
                          key={y}
                          onClick={() => setSelectedYear(y)}
                          className={`px-3 py-1 rounded-md border text-sm font-medium w-24 text-center ${
                            y === selectedYear
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "analysis" && (
                <CommitAnalysis
                  allContributions={allContributions}
                  startDate={startDate}
                  weeks={weeks}
                />
              )}

              {activeTab === "goals" && (
                <ImprovementGoals
                  streak={streak}
                  totalDays={totalDays}
                  achievedDays={achievedDays}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default OnePercentPage;
