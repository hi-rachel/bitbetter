import { motion } from "framer-motion";
import { BookOpen, Brain, Heart, Leaf, Mountain } from "lucide-react";

import TagBadge from "../../common/TagBadge";

const HeroSection = () => {
  const tags = [
    {
      icon: <BookOpen size={20} />,
      name: "Reading",
      color: "text-sky-500",
    },
    {
      icon: <Brain size={20} />,
      name: "Problem Solving",
      color: "text-blue-600",
    },
    {
      icon: <Heart size={20} />,
      name: "Meaningful Life",
      color: "text-rose-400",
    },
    {
      icon: <Leaf size={20} />,
      name: "Sustainability",
      color: "text-emerald-600",
    },
    {
      icon: <Mountain size={20} />,
      name: "Challenge",
      color: "text-amber-500",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
              style={{
                background: "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Hellow,
              <br />
              World.
              <br />
              We&rsquo;re BitBetter.
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-lg sm:text-xl text-gray-600 mb-8"
          >
            &quot;1% Everyday Better&quot;
            <br className="hidden sm:block" />
            매일 1%씩 성장하며, 더 나은 삶과 소프트웨어를 설계합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="flex gap-3 mt-12 flex-wrap"
          >
            {tags.map((tech, i) => (
              <TagBadge
                key={i}
                icon={tech.icon}
                name={tech.name}
                color={tech.color}
                delay={0.9 + i * 0.07}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
