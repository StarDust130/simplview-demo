"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  FileSearch,
  Lock,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

type SecurityItem = {
  num: string;
  icon: LucideIcon;
  media: string;
  title: string;
  desc: string;
};

const securityItems: SecurityItem[] = [
  {
    num: "01",
    icon: Lock,
    media: "an lock and key icon showing secure data.jpg",
    title: "Data never used for AI training",
    desc: "Hard policy, not a setting. Your business data stays in your environment, always",
  },
  {
    num: "02",
    icon: Compass,
    media: "Compass Rose Design",
    title: "You define your business rules",
    desc: "Admin sets how the AI understands your terminology, KPIs, and data. It learns your business, not the other way round",
  },
  {
    num: "03",
    icon: FileSearch,
    media: "an icon shows LLM agent Transparent Logging and Explainability.jpg",
    title: "Transparent Logging and Explainability",
    desc: "The traceability matrix is designed to ensure that AI-generated insights are accurate, governed, and verifiable, connecting natural language questions back to underlying data models and SQL",
  },
];

export default function SecuritySection() {
  return (
    <section
      id="security"
      className="relative z-10 overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 bg-[url('/bg.gif')] bg-cover bg-center opacity-[0.28]" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/[0.86] to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <motion.div
            initial={{ x: -34, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:sticky lg:top-24"
          >
            <span className="inline-flex rounded-full border border-white/[0.15] bg-white/10 px-3 py-1 text-[11px] font-black uppercase text-sky-200 backdrop-blur-md">
              Data Privacy and Governance
            </span>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Your data never leaves{" "}
              <span className="font-serif italic font-semibold">
                your hands
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-base font-medium leading-7 text-white/[0.68]">
              Simplview AI analytics platform offers fully secured deployment -
              zero data shared with any AI training pipeline.
            </p>

            <div className="mt-8 rounded-lg border border-white/[0.12] bg-white/[0.08] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-black text-white">
                  Governed insight path
                </p>
                <span className="rounded-full bg-emerald-300 px-3 py-1 text-[11px] font-black text-emerald-950">
                  verified
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["Question", "Model", "SQL"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0.4, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.45 }}
                    className="rounded-lg bg-white/10 p-3 text-center text-xs font-bold text-white/[0.72]"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {securityItems.map((item, index) => (
              <motion.article
                key={item.num}
                initial={{ y: 34, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.58, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group grid gap-5 rounded-lg border border-white/[0.12] bg-white/[0.08] p-5 backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500 hover:border-sky-300/[0.45] hover:bg-white/[0.12] hover:shadow-[0_24px_70px_rgba(125,211,252,0.12)] sm:grid-cols-[5rem_1fr]"
              >
                <div>
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-white text-slate-950 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-4 block text-xs font-black text-sky-200">
                    {item.num}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase text-white/[0.35]">
                    {item.media}
                  </p>
                  <h3 className="mt-1 text-xl font-black leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-white/[0.65]">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          id="contact"
          className="mt-20 scroll-mt-24 overflow-hidden rounded-lg border border-white/[0.14] bg-white text-slate-950 shadow-[0_40px_120px_rgba(0,0,0,0.32)] md:scroll-mt-28"
          initial={{ y: 42, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-[1fr_0.78fr]">
            <div className="p-6 md:p-10">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase text-blue-600">
                Book a live demo
              </span>
              <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.04] tracking-tight md:text-5xl">
                Ready to give your team{" "}
                <span className="font-serif italic font-semibold">
                  their data back?
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">
                Book a 20-minute live demo. We&apos;ll connect to a sample of
                your actual data and show you what Simplview finds - in the
                first session.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500 active:scale-95">
                  Book my demo - it&apos;s free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-900 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:scale-95">
                  <MessageCircle className="h-4 w-4" />
                  Talk to sales
                </button>
              </div>
              <p className="mt-5 text-xs font-bold text-slate-400">
                No spam. No hard sell. Just 20 minutes with your data.
              </p>
            </div>

            <div className="min-h-72 bg-[url('/bg.gif')] bg-cover bg-center p-5 lg:min-h-full">
              <div className="grid h-full content-end">
                <div className="rounded-lg bg-slate-950/[0.82] p-5 text-white backdrop-blur-md">
                  <p className="text-xs font-black uppercase text-sky-200">
                    First session output
                  </p>
                  <p className="mt-3 text-3xl font-black tracking-tight">
                    20 min
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-white/70">
                    Connect sample data, ask a real business question, and see
                    the answer path.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
