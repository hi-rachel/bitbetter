import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { FC } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  animated?: boolean;
  className?: string;
}

const BitBetterLogo: FC<LogoProps> = ({
  size = "md",
  animated = true,
  className = "",
}) => {
  const sizeConfig = {
    sm: {
      iconSize: 20,
      iconStrokeWidth: 2,
      padding: "p-1.5",
      textSize: "text-xl",
      rounded: "rounded-xl",
      rotate: [0, -2, 2, -2, 0],
    },
    md: {
      iconSize: 24,
      iconStrokeWidth: 2,
      padding: "p-2",
      textSize: "text-2xl",
      rounded: "rounded-xl",
      rotate: [0, -2, 2, -2, 0],
    },
    lg: {
      iconSize: 36,
      iconStrokeWidth: 1.5,
      padding: "p-3",
      textSize: "text-3xl",
      rounded: "rounded-xl",
      rotate: [0, -2, 2, -2, 0],
    },
    xl: {
      iconSize: 64,
      iconStrokeWidth: 1.5,
      padding: "p-5",
      textSize: "text-6xl",
      rounded: "rounded-2xl",
      rotate: [0, -2, 2, -2, 0],
    },
    "2xl": {
      iconSize: 96,
      iconStrokeWidth: 1.2,
      padding: "p-6",
      textSize: "text-7xl",
      rounded: "rounded-[1.5rem]",
      rotate: [0, -2, 2, -2, 0],
    },
    "3xl": {
      iconSize: 128,
      iconStrokeWidth: 1.2,
      padding: "p-8",
      textSize: "text-8xl",
      rounded: "rounded-[2rem]",
      rotate: [0, -2, 2, -2, 0],
    },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      whileHover={animated ? { scale: 1.02 } : {}}
      className={`flex items-center ${className}`}
    >
      {animated && config.rotate ? (
        <motion.div
          className="relative"
          animate={{ rotate: config.rotate }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ rotate: 0 }}
        >
          <div
            className={`${config.padding} ${config.rounded} bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm`}
          >
            <Code2
              className="text-indigo-600"
              size={config.iconSize}
              strokeWidth={config.iconStrokeWidth}
            />
          </div>
        </motion.div>
      ) : (
        <div
          className={`${config.padding} ${config.rounded} bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm`}
        >
          <Code2
            className="text-indigo-600"
            size={config.iconSize}
            strokeWidth={config.iconStrokeWidth}
          />
        </div>
      )}

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
    </motion.div>
  );
};

export default BitBetterLogo;
