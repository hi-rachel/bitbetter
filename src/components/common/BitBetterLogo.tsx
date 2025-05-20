import { Code2 } from "lucide-react";
import { FC } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
}

const BitBetterLogo: FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeConfig = {
    sm: {
      iconSize: 20,
      iconStrokeWidth: 2,
      padding: "p-1.5",
      textSize: "text-xl",
      rounded: "rounded-md",
    },
    md: {
      iconSize: 24,
      iconStrokeWidth: 2,
      padding: "p-2",
      textSize: "text-2xl",
      rounded: "rounded-lg",
    },
    lg: {
      iconSize: 36,
      iconStrokeWidth: 1.5,
      padding: "p-3",
      textSize: "text-3xl",
      rounded: "rounded-xl",
    },
    xl: {
      iconSize: 64,
      iconStrokeWidth: 1.5,
      padding: "p-5",
      textSize: "text-6xl",
      rounded: "rounded-2xl",
    },
    "2xl": {
      iconSize: 96,
      iconStrokeWidth: 1.2,
      padding: "p-6",
      textSize: "text-7xl",
      rounded: "rounded-[1.5rem]",
    },
    "3xl": {
      iconSize: 128,
      iconStrokeWidth: 1.2,
      padding: "p-8",
      textSize: "text-8xl",
      rounded: "rounded-[2rem]",
    },
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`${config.padding} ${config.rounded} bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm`}
      >
        <Code2
          className="text-indigo-600"
          size={config.iconSize}
          strokeWidth={config.iconStrokeWidth}
        />
      </div>

      <div className="ml-3 flex items-baseline gap-0.5">
        <span
          className={`${config.textSize} font-display font-semibold tracking-tight text-indigo-600`}
        >
          Bit
        </span>
        <span
          className={`${config.textSize} font-display font-semibold tracking-tight text-indigo-600`}
        >
          Better
        </span>
      </div>
    </div>
  );
};

export default BitBetterLogo;
