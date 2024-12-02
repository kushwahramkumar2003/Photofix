"use client";

import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";

export function AnimatedImage() {
  return (
    <div className="relative w-48 h-48 mx-auto mb-8">
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <ImageOff size={64} />
      </motion.div>
    </div>
  );
}
