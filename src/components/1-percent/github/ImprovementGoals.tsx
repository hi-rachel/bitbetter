import { useState } from "react";
import {
  Target,
  Check,
  Plus,
  Trash2,
  BookOpen,
  Code,
  Github,
} from "lucide-react";

interface Goal {
  id: number;
  text: string;
  target: number | null;
  icon: "github" | "book" | "code";
  completed: boolean;
}

interface ImprovementGoalsProps {
  streak: number;
  totalDays: number;
  achievedDays: number;
}

const ImprovementGoals: React.FC<ImprovementGoalsProps> = ({
  streak,
  totalDays,
  achievedDays,
}) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      text: "30일 연속 커밋하기",
      target: 30,
      icon: "github",
      completed: streak >= 30,
    },
    {
      id: 2,
      text: "달성률 75% 넘기기",
      target: 75,
      icon: "book",
      completed: (achievedDays / totalDays) * 100 >= 75,
    },
    {
      id: 3,
      text: "토이 프로젝트 완성하기",
      target: null,
      icon: "code",
      completed: false,
    },
  ]);
  const [newGoal, setNewGoal] = useState<string>("");

  const handleAddGoal = (): void => {
    if (newGoal.trim() !== "") {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          text: newGoal,
          target: null,
          icon: "code",
          completed: false,
        },
      ]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id: number): void => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const removeGoal = (id: number): void => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const getIconComponent = (iconName: "github" | "book" | "code") => {
    switch (iconName) {
      case "github":
        return <Github className="w-5 h-5" />;
      case "book":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const calculateProgress = (): number => {
    const completed = goals.filter((goal) => goal.completed).length;
    return (completed / goals.length) * 100;
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center">
          <Target className="w-5 h-5 mr-2 text-indigo-500" />
          개선 목표
        </h2>
        <div className="text-sm text-slate-500">
          {goals.filter((goal) => goal.completed).length}/{goals.length} 완료
        </div>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <ul className="space-y-3 mb-6">
        {goals.map((goal) => (
          <li
            key={goal.id}
            className={`flex items-center justify-between p-3 rounded-md border transition-all ${
              goal.completed
                ? "bg-green-50 border-green-100"
                : "bg-slate-50 border-slate-100 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center">
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center transition-colors ${
                  goal.completed
                    ? "bg-green-500 text-white"
                    : "bg-white border border-slate-300 text-transparent hover:border-slate-400"
                }`}
              >
                <Check className="w-4 h-4" />
              </button>

              <div className="flex items-center">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    goal.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {getIconComponent(goal.icon)}
                </span>
                <span
                  className={`font-medium ${
                    goal.completed ? "text-green-700" : "text-slate-700"
                  }`}
                >
                  {goal.text}
                  {goal.target && (
                    <span className="ml-2 text-sm font-normal text-slate-500">
                      목표: {goal.target}
                      {goal.icon === "github" ? "일" : "%"}
                    </span>
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={() => removeGoal(goal.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex mt-4">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="새 목표 추가하기..."
          className="flex-1 border border-slate-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          onClick={handleAddGoal}
          className="bg-indigo-500 text-white px-3 py-2 rounded-r-md hover:bg-indigo-600 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ImprovementGoals;
