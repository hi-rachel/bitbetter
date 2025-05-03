import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { FC } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const BitBetterLogo: FC<LogoProps> = ({
  size = "md",
  animated = true,
  className = "",
}) => {
  // 사이즈별 설정
  const sizeConfig = {
    sm: {
      iconSize: 20,
      iconStrokeWidth: 2,
      padding: "p-1.5",
      textSize: "text-xl",
    },
    md: {
      iconSize: 24,
      iconStrokeWidth: 2,
      padding: "p-2",
      textSize: "text-2xl",
    },
    lg: {
      iconSize: 36,
      iconStrokeWidth: 1.5,
      padding: "p-3",
      textSize: "text-3xl",
    },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      whileHover={animated ? { scale: 1.02 } : {}}
      className={`flex items-center ${className}`}
    >
      {animated ? (
        <motion.div
          className="relative"
          animate={{
            rotate: [0, -2, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ rotate: 0 }}
        >
          <div
            className={`${config.padding} bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm`}
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
          className={`${config.padding} bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm`}
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
