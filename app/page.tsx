"use client";

import Footer from "@/components/landing/footer";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Navbar from "@/components/landing/Navbar";
import SecuritySection from "@/components/landing/SecuritySection";
import StatsSection from "@/components/landing/StatsSection";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen w-full overflow-x-hidden">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/bg.gif"
            alt="Nature background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/40" />
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-30 pb-12">
          {/* Headline */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="max-w-3xl text-center"
          >
            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              Your Team Deserves Answers{" "}
              <span className="font-serif italic font-normal">in Seconds,</span>
              Not Days
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-white font-bold md:text-base"
          >
            Ask questions in plain English. Get charts, trends, and AI
            predictions instantly. No SQL. No analyst queue. Just answers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex  items-center gap-3 flex-row"
          >
            {/* Primary — Demo */}
            <Link
              href="/dashboard"
              className="group relative inline-flex overflow-hidden rounded-full bg-blue-600 px-7 py-3 text-sm font-black text-white shadow-2xl shadow-blue-950/25 transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-950/40 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/[0.35] blur-md transition-transform duration-700 group-hover:translate-x-44" />
            </Link>

            {/* Secondary — Get Started */}
            <a
              href="#contact"
              className="group rounded-full border border-white/25 bg-white/[0.14] px-7 py-3 text-sm font-black text-white shadow-xl shadow-black/10 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/[0.45] hover:bg-white/[0.22] active:scale-95"
            >
              <span className="flex items-center gap-2">
                Book a 20-min Demo
              </span>
            </a>
          </motion.div>

          {/* Video Player — below fold, can scroll */}
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-14 w-full max-w-5xl mx-auto"
          >
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-black/15 backdrop-blur-2xl transform-gpu">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 border-b border-black/5 bg-white/50 px-4 py-2.5 backdrop-blur-sm">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/60 px-3 py-0.5 text-[11px] font-medium text-slate-400 shadow-sm">
                  <svg
                    className="h-3 w-3 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9" />
                    <path d="M13 17V5" />
                    <path d="M8 17v-3" />
                  </svg>
                  simplview.com
                </div>
                <div className="w-14" />
              </div>

              {/* Video */}
              <div className="relative w-full bg-white">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block -mb-[1px]"
                >
                  <source src="/landing-page-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* All other sections */}
      <StatsSection />
      <HowItWorksSection />
      <SecuritySection />
      <Footer />
    </>
  );
}
