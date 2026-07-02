"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  LayoutDashboard,
  ChevronRight,
  BookOpen,
  FileText,
  Database,
  BarChart3,
  Menu,
  X,
  Settings,
  HelpCircle,
  Star,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import Image from "next/image";
import {
  formatSmartbookPreview,
  loadSmartbooks,
  subscribeToSmartbookUpdates,
} from "@/lib/chat";

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

const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.04 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [smartbooks, setSmartbooks] = useState(loadSmartbooks());
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    SMARTBOOKS: true,
    "DATA SOURCES": false,
    "PUBLISHED DASHBOARDS": false,
  });

  useEffect(() => {
    const sync = () => setSmartbooks(loadSmartbooks());
    sync();
    return subscribeToSmartbookUpdates(sync);
  }, []);

  useEffect(() => {
    if (pathname?.startsWith("/chat/")) {
      setExpanded((prev) => ({ ...prev, SMARTBOOKS: true }));
    }
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggle = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const smartbookItems = useMemo(
    () =>
      smartbooks.slice(0, 4).map((smartbook) => ({
        ...smartbook,
        preview: formatSmartbookPreview(smartbook.messages[0]),
      })),
    [smartbooks],
  );

  const openSmartbook = (smartbookId: string) => {
    router.push(`/chat/${smartbookId}`);
    setMobileOpen(false);
  };

  const getSectionCount = (section: Section) => {
    if (section.title === "SMARTBOOKS") return smartbooks.length;
    return section.count;
  };

  const withExpand = (fn: () => void) => (e?: React.MouseEvent) => {
    if (isCollapsed) {
      e?.stopPropagation();
      setIsCollapsed(false);
      return;
    }
    fn();
  };

  const Tooltip = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    if (!isCollapsed) return <>{children}</>;

    const handleEnter = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setCoords({ x: rect.right + 10, y: rect.top + rect.height / 2 });
        setShow(true);
      }
    };

    return (
      <>
        <div
          ref={ref}
          onMouseEnter={handleEnter}
          onMouseLeave={() => setShow(false)}
          className="flex items-center justify-center"
        >
          {children}
        </div>
        {show && (
          <div
            className="fixed z-[100] pointer-events-none"
            style={{
              left: coords.x,
              top: coords.y,
              transform: "translateY(-50%)",
            }}
          >
            <div className="relative px-2.5 py-1.5 bg-slate-800 text-white text-[11px] font-medium rounded-lg shadow-xl whitespace-nowrap">
              {label}
              <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-[5px] border-transparent border-r-slate-800" />
            </div>
          </div>
        )}
      </>
    );
  };

  // Check if a section is active (for collapsed highlight)
  const isSectionActive = (section: Section) => {
    if (section.title === "SMARTBOOKS") {
      return pathname?.startsWith("/chat/");
    }
    return false;
  };

  return (
    <>
      {/* Mobile Toggle */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(true)}
            className="lg:hidden fixed top-4 right-4 z-50 p-2.5 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/60 text-slate-700 hover:text-[#2563eb] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        onMouseEnter={() => isCollapsed && setIsHoveringSidebar(true)}
        onMouseLeave={() => setIsHoveringSidebar(false)}
        onClick={() => isCollapsed && setIsCollapsed(false)}
        className={`
          fixed lg:sticky inset-y-0 left-0 z-50
          ${mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-[72px]" : "lg:w-72"}
          bg-white/95 backdrop-blur-2xl border-r border-slate-200/60 
          flex flex-col flex-shrink-0
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          shadow-2xl lg:shadow-none
          ${isCollapsed ? "lg:cursor-pointer" : ""}
        `}
      >
        {/* Header */}
        <div className="relative p-5 pb-3">
          {/* Collapse button — desktop expanded only */}
          {!isCollapsed && (
            <button
              className="hidden lg:flex absolute top-4 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(true);
                setIsHoveringSidebar(false);
              }}
              title="Collapse sidebar"
            >
              <PanelRightClose className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {isCollapsed ? (
                <div className="hidden lg:flex items-center justify-center w-10 h-10">
                  <AnimatePresence mode="wait">
                    {isHoveringSidebar ? (
                      <motion.div
                        key="expand"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="p-2 rounded-xl bg-slate-100 text-slate-600 cursor-pointer"
                      >
                        <PanelRightOpen className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Image
                          src="/icon.png"
                          alt="S"
                          width={32}
                          height={32}
                          className="rounded-lg"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Image
                    src="/icon.png"
                    alt="Simplview"
                    width={40}
                    height={40}
                    className="rounded-xl"
                  />
                  <div>
                    <h1 className="font-extrabold text-[20px] leading-none">
                      Simplview
                    </h1>
                    <p className="text-xs font-serif italic text-slate-500 mt-0.5">
                      AI Business Intelligence
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileOpen(false);
              }}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className={`h-px bg-slate-100/60 mb-3 ${isCollapsed ? "lg:hidden" : ""}`}
        />

        {/* New Analysis */}
        <div className={`px-3 mb-2 ${isCollapsed ? "lg:px-2" : ""}`}>
          <Tooltip label="New Analysis">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={withExpand(() => router.push("/dashboard"))}
              className={`
        flex items-center rounded-xl text-sm font-bold 
        transition-all duration-200 cursor-pointer
        ${
          isCollapsed
            ? "justify-center lg:w-10 lg:h-10 lg:mx-auto border-2 border-dotted border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50"
            : "justify-start gap-3 w-full px-4 py-2.5 border-2 border-dotted border-slate-200 bg-transparent text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] hover:shadow-[3px_3px_0px_0px_#2563eb]"
        }
      `}
            >
              <Plus className="w-4 h-4 stroke-[3] shrink-0" />
              <div
                className={`
          overflow-hidden whitespace-nowrap transition-all duration-300
          ${isCollapsed ? "max-w-0 opacity-0 hidden" : "max-w-[200px] opacity-100"}
        `}
              >
                <span className="font-mono">New Analysis</span>
              </div>
            </motion.button>
          </Tooltip>
        </div>

        {/* Canvas */}
        <div className={`px-3 mb-3 ${isCollapsed ? "lg:px-2" : ""}`}>
          <Tooltip label="Canvas">
            <motion.button
              whileHover={isCollapsed ? { scale: 1.1 } : { x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={withExpand(() => router.push("/dashboard"))}
              className={`
                flex items-center rounded-xl text-sm font-medium 
                transition-all duration-200 cursor-pointer
                ${
                  isCollapsed
                    ? "justify-center lg:w-10 lg:h-10 lg:mx-auto text-slate-500 hover:text-[#2563eb] hover:bg-slate-100"
                    : "justify-start gap-3 w-full px-4 py-2.5 bg-transparent text-slate-600 hover:bg-slate-50 hover:text-[#2563eb]"
                }
              `}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <div
                className={`
                  overflow-hidden whitespace-nowrap transition-all duration-300
                  ${isCollapsed ? "max-w-0 opacity-0 hidden" : "max-w-[200px] opacity-100"}
                `}
              >
                <span className="font-mono">Canvas</span>
              </div>
            </motion.button>
          </Tooltip>
        </div>

        <div
          className={`h-px bg-slate-100/60 mb-2 ${isCollapsed ? "hidden" : ""}`}
        />

        {/* Sections */}
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {sections.map((section, idx) => {
            const sectionActive = isSectionActive(section);
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="mb-0.5"
              >
                <Tooltip label={section.title}>
                  <button
                    onClick={withExpand(() => toggle(section.title))}
                    className={`
                      flex items-center rounded-xl text-[11px] font-bold 
                      transition-all duration-200 tracking-wider uppercase cursor-pointer
                      ${
                        isCollapsed
                          ? "justify-center lg:w-10 lg:h-10 lg:mx-auto text-slate-500 hover:text-[#2563eb] hover:bg-slate-100"
                          : "justify-between w-full px-3 py-2.5 text-slate-500 hover:text-[#2563eb] hover:bg-slate-100/60"
                      }
                      ${sectionActive && isCollapsed ? "lg:bg-blue-50 lg:text-blue-600" : ""}
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <section.icon className="w-4 h-4 shrink-0" />
                      <div
                        className={`
                          overflow-hidden whitespace-nowrap transition-all duration-300
                          ${isCollapsed ? "max-w-0 opacity-0 hidden" : "max-w-[200px] opacity-100"}
                        `}
                      >
                        {section.title}
                      </div>
                    </div>
                    <div
                      className={`
                        flex items-center gap-2 transition-all duration-300
                        ${isCollapsed ? "max-w-0 opacity-0 hidden" : "max-w-[100px] opacity-100"}
                      `}
                    >
                      {getSectionCount(section) !== undefined && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold">
                          {getSectionCount(section)}
                        </span>
                      )}
                      {section.hasAdd && (
                        <div className="p-0.5 hover:bg-blue-50 rounded-md transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <motion.div
                        animate={{ rotate: expanded[section.title] ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  </button>
                </Tooltip>

                <AnimatePresence initial={false}>
                  {!isCollapsed && expanded[section.title] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-2 pt-0.5">
                        {section.title === "SMARTBOOKS" ? (
                          smartbookItems.length > 0 ? (
                            <motion.div
                              className="space-y-0.5"
                              variants={listContainer}
                              initial="hidden"
                              animate="visible"
                            >
                              {smartbookItems.map((smartbook) => {
                                const isActive =
                                  pathname === `/chat/${smartbook.id}`;
                                return (
                                  <motion.button
                                    key={smartbook.id}
                                    variants={listItem}
                                    whileHover={{ x: 3 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={withExpand(() =>
                                      openSmartbook(smartbook.id),
                                    )}
                                    className={`group relative w-full rounded-lg text-left transition-all duration-200 ${
                                      isActive
                                        ? "bg-blue-50/80 text-blue-700"
                                        : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-900"
                                    }`}
                                  >
                                    {isActive && (
                                      <motion.div
                                        layoutId="activeSmartbookIndicator"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-r-full bg-blue-600"
                                        transition={{
                                          type: "spring",
                                          stiffness: 500,
                                          damping: 35,
                                        }}
                                      />
                                    )}
                                    <div className="flex items-center justify-between px-3 py-2">
                                      <span className="truncate text-[13px] font-medium leading-tight">
                                        {smartbook.title}
                                      </span>
                                      <span className="shrink-0 ml-2 text-[11px] font-medium text-slate-400 tabular-nums">
                                        {smartbook.messages.length}
                                      </span>
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="rounded-xl border border-dashed border-slate-300/70 bg-slate-50/50 p-3 text-center"
                            >
                              <p className="text-xs text-slate-400">
                                Your first smartbook will appear here.
                              </p>
                            </motion.div>
                          )
                        ) : section.items.length > 0 ? (
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
            );
          })}
        </div>

        {/* Bottom Nav */}
        <div
          className={`px-3 py-2 border-t border-slate-200/50 space-y-0.5 ${isCollapsed ? "lg:px-2" : ""}`}
        >
          {bottomNav.map((nav) => (
            <Tooltip key={nav.label} label={nav.label}>
              <motion.button
                whileHover={isCollapsed ? { scale: 1.1 } : { x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={withExpand(() => router.push("/dashboard"))}
                className={`
                  flex items-center rounded-xl text-sm font-medium 
                  transition-all duration-200
                  ${
                    isCollapsed
                      ? "justify-center lg:w-10 lg:h-10 lg:mx-auto text-slate-500 hover:text-[#2563eb] hover:bg-slate-100"
                      : "justify-start gap-3 w-full px-3 py-2 text-slate-500 hover:text-[#2563eb] hover:bg-slate-100/60"
                  }
                `}
              >
                <nav.icon className="w-4 h-4 shrink-0" />
                <div
                  className={`
                    overflow-hidden whitespace-nowrap transition-all duration-300
                    ${isCollapsed ? "max-w-0 opacity-0 hidden" : "max-w-[200px] opacity-100"}
                  `}
                >
                  <span className="font-mono">{nav.label}</span>
                </div>
              </motion.button>
            </Tooltip>
          ))}
        </div>

        {/* User Profile */}
        <div
          className={`border-t border-slate-200/50 p-3 ${isCollapsed ? "lg:p-2" : ""}`}
        >
          <Tooltip label={`Squirtle • ${smartbooks.length} smartbooks`}>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={withExpand(() => router.push("/dashboard"))}
              className={`
                group flex items-center gap-3 w-full rounded-xl transition-all duration-200 hover:bg-slate-100
                ${isCollapsed ? "lg:justify-center lg:p-2" : "p-2.5"}
              `}
            >
              <img
                src="https://avatarfiles.alphacoders.com/374/thumb-1920-374586.png"
                alt="Profile"
                className={`
                  rounded-xl object-cover shrink-0 transition-all duration-300
                  ${isCollapsed ? "h-9 w-9" : "h-9 w-9"}
                `}
              />
              <div
                className={`
                  min-w-0 flex-1 text-left overflow-hidden transition-all duration-300
                  ${isCollapsed ? "lg:max-w-0 lg:opacity-0 lg:hidden" : "max-w-[200px] opacity-100"}
                `}
              >
                <p className="truncate text-sm font-semibold text-slate-900 font-serif">
                  Squirtle
                </p>
                <p className="text-xs text-slate-500">
                  {smartbooks.length} smartbooks
                </p>
              </div>
              <div
                className={`
                  transition-all duration-300
                  ${isCollapsed ? "lg:max-w-0 lg:opacity-0 lg:hidden" : "max-w-[20px] opacity-100"}
                `}
              >
                <ChevronRight className="h-4 w-4 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-700 shrink-0" />
              </div>
            </motion.button>
          </Tooltip>
        </div>
      </aside>
    </>
  );
}
