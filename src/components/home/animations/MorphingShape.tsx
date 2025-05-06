import { motion } from "framer-motion";

const MorphingShape: React.FC = () => {
  return (
    <motion.div
      className="absolute top-1/2 left-10 w-32 h-32 hidden md:block"
      animate={{
        borderRadius: ["20%", "50%", "40%", "30%", "20%"],
        scale: [1, 1.2, 0.8, 1.1, 1],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "linear-gradient(45deg, #6366F1, #A855F7, #EC4899)",
        opacity: 0.2,
        filter: "blur(10px)",
      }}
    />
  );
};

export default MorphingShape;
