"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-4 bg-white/90 backdrop-blur-md border border-white/50 rounded-full shadow-lg"
        >
          <div className="flex justify-center items-center h-14 px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/juan.png"
                  alt="Juan Cruz Cummaudo"
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full"
                  priority
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
