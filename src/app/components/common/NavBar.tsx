import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import Image from "next/image";

const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-40 backdrop-blur-lg bg-white/80 border-b border-gray-200/50"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.02 }} className="relative group">
          <div className="flex items-center gap-2">
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
              <div className="p-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm">
                <Code2 className="text-indigo-600" size={24} strokeWidth={2} />
              </div>
            </motion.div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-display font-semibold tracking-tight text-indigo-600">
                Bit
              </span>
              <span className="text-2xl font-display font-semibold tracking-tight text-indigo-600">
                Better
              </span>
            </div>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {["Blog", "Books", "Bookmark", "1%"].map((item, i) => (
            <motion.a
              key={item}
              href={`${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 hover:text-indigo-600 transition-colors text-lg"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            href="https://github.com/hi-rachel"
            target="_blank"
          >
            <Image
              src={"/logo/github.svg"}
              alt="github"
              width={20}
              height={20}
            />
          </motion.a>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
