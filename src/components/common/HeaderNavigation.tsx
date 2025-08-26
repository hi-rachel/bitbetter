import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import BitBetterLogo from "./BitBetterLogo";

const HeaderNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Blog", path: "blog" },
    { name: "Books", path: "books" },
    { name: "Bookmark", path: "bookmark" },
    { name: "Playlist", path: "playlist" },
    { name: "1%", path: "1-percent" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-40 backdrop-blur-lg bg-white/80 border-b border-gray-200/50"
      >
        <div className="h-[72px] container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href={"/"}>
            <BitBetterLogo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, i) => {
              const isActive = pathname === `/${item.path}`;
              return (
                <motion.a
                  key={item.name}
                  href={`/${item.path}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`${
                    isActive ? "text-indigo-700" : "text-gray-800"
                  } hover:text-indigo-600 transition-colors text-lg font-semibold`}
                  onClick={toggleMenu}
                >
                  {item.name}
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {/* GitHub Link */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              href="https://github.com/hi-rachel/bitbetter/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="/logo/github.svg"
                alt="github"
                width={23}
                height={23}
              />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={toggleMenu}
              className="md:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 backdrop-blur-md bg-white/30 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-64 bg-white z-50 md:hidden shadow-lg pt-20 px-6"
      >
        <div className="flex flex-col space-y-6">
          {menuItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={`/${item.path}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ x: 5 }}
              className="text-gray-800 hover:text-indigo-600 transition-colors text-lg font-medium"
              onClick={toggleMenu}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default HeaderNavigation;
