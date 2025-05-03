import { useEffect, useState } from "react";

const TerminalLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1.3초(1300ms) 동안 진행 바가 0%에서 100%까지 채워지도록 설정
    // 약 13ms마다 1씩 증가하면 1300ms에 100%에 도달
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return Math.min(prev + 1, 100);
        }
        return 100;
      });
    }, 13);

    // 개발자 콘솔 메시지
    console.log(
      "%c✨ BitBetter Portfolio ✨",
      "color: white; background-color: #6366F1; font-size: 16px; padding: 6px 10px; border-radius: 4px; font-weight: bold;"
    );
    console.log(
      "%cHello developer! If you're reading this, you're curious like me 👀\n📬 Contact: rachel.uiux@gmail.com",
      "color: #4B5563; font-size: 13px;"
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono bg-gray-900 text-green-400 p-6 rounded-xl shadow-2xl w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-gray-500">terminal</span>
      </div>
      <div className="space-y-2">
        <p>
          <span className="text-purple-400">$</span> npm run dev:portfolio
        </p>
        <p>
          <span className="text-purple-400">$</span> Loading components... [
          {progress}%]
        </p>
        <p className="text-blue-400">
          <span className="text-purple-400">$</span> Initializing 3D
          environment... 🚀
        </p>
        <p className="text-cyan-400">
          <span className="text-purple-400">$</span> Building frontend magic...
          ✨
        </p>
        <div className="mt-2 bg-gray-800 rounded p-2">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;
