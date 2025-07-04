"use client";

import React, { useEffect, useState } from "react";

import { AnimatePresence,motion } from "framer-motion";

import FloatingCodeBlock from "@/components/home/animations/FloatingCodeBlock";
import InteractiveParticles from "@/components/home/animations/InteractiveParticles";
import MorphingShape from "@/components/home/animations/MorphingShape";
import ThreeBackground from "@/components/home/animations/ThreeBackground";
import TerminalLoader from "@/components/home/loader/TerminalLoader";
import HeroSection from "@/components/home/sections/HeroSection";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ThreeBackground />
      <InteractiveParticles />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex items-center justify-center bg-white z-50 p-4"
          >
            <TerminalLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection />
      <MorphingShape />
      <FloatingCodeBlock />
    </>
  );
};

export default HomePage;
