"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Upload,
  ArrowRight,
  MessageSquare,
  Sparkles,
  FileText,
  BarChart3,
  TrendingUp,
  Zap,
  Users,
  ArrowUpRight,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 18, stiffness: 100 },
  },
};

export default function Dashboard() {
  return (
    <div className="min-h-full relative">
      {/* 🌿 Nature Background — Real Hill Texture Feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top sky area */}
        <div className="absolute top-0 left-0 right-0 h-[45%] bg-white/80  to-transparent" />

        

        {/* Warm bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#e8e4d9]/60 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:py-16"
      >
        {/* 🚀 Header */}
        <motion.div variants={item} className="text-center mb-10 lg:mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight text-stone-900">
            Simplview{" "}
            <span className="font-serif italic text-[#0f8eea]]">Launchpad</span>
          </h1>
          <p className="text-base lg:text-lg text-stone-500 font-medium">
            Jump back in from where you left off
          </p>
        </motion.div>

        {/* 🔍 Search Bar — Glass over nature */}
        <motion.div variants={item} className="max-w-3xl mx-auto mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-[#0f8eea]]/10 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative flex items-center gap-3 px-5 lg:px-6 py-3.5 lg:py-4 bg-white/85 backdrop-blur-2xl rounded-full border border-white/80 shadow-2xl shadow-stone-200/40 hover:shadow-stone-300/50 transition-all duration-300">
              <Mic className="w-5 h-5 text-stone-400 flex-shrink-0 hover:text-[#0f8eea] transition-colors cursor-pointer" />
              <input
                type="text"
                placeholder="Ask Simplview to analyze trends"
                className="flex-1 bg-transparent outline-none text-stone-800 placeholder:text-stone-400 text-sm lg:text-base min-w-0"
              />
              <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
                <button className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-full text-stone-500 hover:text-[#0f8eea]] hover:bg-stone-100/80 transition-all text-sm font-medium">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload</span>
                </button>
                <div className="w-px h-5 bg-stone-200" />
                <button className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 rounded-full  text-[#0f8eea]] hover:bg-[#e4efe0] transition-all text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-whie animate-pulse" />
                  <span>Sheets</span>
                </button>
                <motion.button
                  whileHover={{ scale: 1.08, x: 2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#0f8eea]] text-sky-500 flex items-center justify-center shadow-lg hover:bg-[#234820] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 🔗 Quick Links */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 lg:gap-4 text-sm text-stone-500 mb-12 lg:mb-16"
        >
          <button className="hover:text-[#0f8eea]] transition-colors font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50">
            <Sparkles className="w-4 h-4" />
            Start Analysis From Scratch
          </button>
          <span className="text-stone-300">•</span>
          <button className="hover:text-[#0f8eea]] transition-colors font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50">
            <FileText className="w-4 h-4" />
            Try a Template
          </button>
        </motion.div>


      </motion.div>
    </div>
  );
}
