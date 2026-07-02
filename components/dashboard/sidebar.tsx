"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  LayoutDashboard,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FileText,
  Database,
  BarChart3,
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut,
  Star,
} from "lucide-react";
import Image from "next/image";

interface Section {
  title: string;
  icon: React.ElementType;
  count?: number;
  hasAdd?: boolean;
  items: Array<{ type: "empty"; message: string; action?: string }>;
}

const sections: Section[] = [
  {
    title: "SMARTBOOKS",
    icon: BookOpen,
    count: 1,
    items: [],
  },
  {
    title: "TEMPLATES",
    icon: FileText,
    items: [],
  },
  {
    title: "DATA SOURCES",
    icon: Database,
    hasAdd: true,
    items: [
      { type: "empty", message: "No data connected", action: "Connect Source" },
    ],
  },
  {
    title: "PUBLISHED DASHBOARDS",
    icon: BarChart3,
    count: 0,
    items: [{ type: "empty", message: "No published items" }],
  },
];

const bottomNav = [
  { icon: Star, label: "Favorites" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help Center" },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "DATA SOURCES": false,
    "PUBLISHED DASHBOARDS": false,
  });

  const toggle = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/60 text-slate-700 hover:text-[#2563eb] transition-colors"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-40 w-72 
          bg-white/95 backdrop-blur-2xl border-r border-slate-200/60 
          flex flex-col overflow-hidden flex-shrink-0
          transition-transform duration-300 ease-out
          shadow-2xl lg:shadow-none
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-5 pb-3">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Simplview"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <div>
              <h1 className="font-semibold text-[17px]">Simplview</h1>

              <p className="text-xs text-slate-500">AI Business Intelligence</p>
            </div>
          </div>
        </div>
        <div className="mx-4 h-px bg-slate-200/60 mb-2" />

        {/* New Analysis */}
        <div className="px-3 mb-2">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface border-2 border-dotted text-black font-small font-bold text-center hover:bg-slate-100/80 hover:text-[#2563eb]transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>New Analysis</span>
          </motion.button>
        </div>

        {/* Canvas */}
        <div className="px-3 mb-3">
          <motion.button
            whileHover={{ x: 2 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-100/80 hover:text-[#2563eb] transition-colors font-small font-bold cursor-pointer"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Canvas</span>
          </motion.button>
        </div>

        <div className="mx-4 h-px bg-slate-200/60 mb-2" />

        {/* Sections */}
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="mb-0.5"
            >
              <button
                onClick={() => toggle(section.title)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] font-bold text-slate-500 hover:text-[#2563eb] hover:bg-slate-100/60 transition-colors tracking-wider uppercase cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <section.icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {section.count !== undefined && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold">
                      {section.count}
                    </span>
                  )}
                  {section.hasAdd && (
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      className="p-0.5 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </motion.div>
                  )}
                  <motion.div
                    animate={{ rotate: expanded[section.title] ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expanded[section.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-2 pt-0.5">
                      {section.items.length > 0 ? (
                        section.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center"
                          >
                            <p className="text-sm text-slate-500 mb-2">
                              {item.message}
                            </p>
                            {item.action && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] hover:underline transition-colors"
                              >
                                {item.action}
                              </motion.button>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <div className="py-3 px-3 text-sm text-slate-400 italic text-center">
                          No items yet
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div className="px-3 py-2 border-t border-slate-200/50 space-y-0.5">
          {bottomNav.map((nav) => (
            <motion.button
              key={nav.label}
              whileHover={{ x: 2 }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-500 hover:text-[#2563eb] hover:bg-slate-100/60 transition-colors text-sm font-medium"
            >
              <nav.icon className="w-4 h-4" />
              <span>{nav.label}</span>
            </motion.button>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-slate-200/50 p-3">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-slate-100"
          >
            <img
              src="https://avatarfiles.alphacoders.com/374/thumb-1920-374586.png"
              alt="Profile"
              className="h-10 w-10 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-semibold text-slate-900">
                Squirtle
              </p>

              <p className="text-xs text-slate-500">Free Plan</p>
            </div>

            <ChevronRight className="h-4 w-4 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-700" />
          </motion.button>
        </div>
      </aside>
    </>
  );
}
