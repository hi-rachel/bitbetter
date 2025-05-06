import { motion } from "framer-motion";

interface TagBadgeProps {
  icon: React.ReactNode;
  name: string;
  color: string;
  delay: number;
}

const TagBadge: React.FC<TagBadgeProps> = ({ icon, name, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.1, y: -5 }}
      className={`${color} bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-200/50 flex items-center gap-2 cursor-pointer`}
    >
      {icon}
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
};

export default TagBadge;
