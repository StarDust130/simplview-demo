"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "3 Days", label: "saved per report request — answers in 30 seconds" },
  { value: "$20K+", label: "saved vs Traditional BI setup costs" },
  { value: "$80K+", label: "in analyst costs automated per year" },
  { value: "10+", label: "industry verticals — D2C, BFSI, manufacturing & more" },
];

export default function StatsBanner() {
  return (
    <section className="relative z-10 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
