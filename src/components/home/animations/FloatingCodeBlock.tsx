import { motion } from "framer-motion";

const FloatingCodeBlock = () => {
  const code = `const author = {
  name: 'Raina Moon',
  role: 'Software Engineer',
  skills: ['React', 'TypeScript', 'Next.js', 'RESTfulAPI'],
  passion: 'creating amazing web experiences',
  status: 'open to opportunities ⚡️',
  specialty: 'UI/UX, Performance Optimization',
  focus: 'Accessibility, AI-driven Productivity'
};

console.log(developer.passion); // creating amazing web experiences`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 1, type: "spring" }}
      className="hidden xl:block absolute right-8 top-32 bg-gray-900/95 text-gray-100 p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700/50"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-gray-500 font-mono">devInfo.js</span>
      </div>
      <pre className="text-sm font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
};

export default FloatingCodeBlock;
