"use client";

import { motion } from "framer-motion";
import { Zap, BrainCircuit, Puzzle, Settings, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Zero training for any user",
    desc: "No SQL, no dashboard building, no analyst required. Any manager gets answers in 30 seconds from day one",
    icon: Zap, // Swapped to Zap to match the lightning bolt in your image
  },
  {
    title: "What, why & predict - all in one",
    desc: "Goes beyond dashboards. Explains why trends happened and forecasts what comes next. Not just historical charts",
    icon: BrainCircuit,
  },
  {
    title: "Plug-and-play multi-source connectivity",
    desc: "Connects to ERP, CRM, POS, distributor systems in minutes. One admin setup, all users benefit immediately",
    icon: Puzzle,
  },
  {
    title: "Your business rule layer",
    desc: "Admin defines how the AI understands your business terminology, KPIs, and data relationships. No guesswork",
    icon: Settings,
  },
];

export default function WhyChooseUs() {
  return (
    // Applied your specific beige background from the previous component design
    <section className="relative z-10 bg-[#F3F1EA] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Adjusted to a 12-column asymmetric grid for better visual balance */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column — Typography (Takes up 5 columns) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pr-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Reduced bottom margin to tighten the gap to the headline */}
              <div className="mb-3 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Why Simplview Wins
                </span>
              </div>

              {/* Fixed the leading (line-height) to remove the massive invisible gap */}
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-[1.05]">
                Built for business teams, <br />
                <span className="font-serif italic font-normal text-slate-800">
                  not data teams
                </span>
              </h2>

              <p className="mt-5 text-sm md:text-[15px] leading-relaxed text-slate-600 max-w-md">
                Every other BI tool was built for analysts. Simplview is the
                first one built for the people who actually need the answers.
              </p>
            </motion.div>
          </div>

          {/* Right Column — Cards Grid (Takes up 7 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  // Premium Hover Physics: Lifts the card, deepens the shadow, and shifts border color
                  className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl cursor-default"
                >
                  <div className="mb-5 flex items-start justify-between">
                    {/* Dark icon container as shown in your mockup */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    {/* The micro-interaction arrow */}
                    <ArrowRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-900" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
