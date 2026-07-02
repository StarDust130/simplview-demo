"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Problems", href: "#problems", id: "problems" },
  { label: "How it works", href: "#how-it-works", id: "how-it-works" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("problems");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 42);
    setHidden(latest > 120 && latest > previous);
  });

  useEffect(() => {
    const updateActiveSection = () => {
      let current = navLinks[0].id;

      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (!section) continue;

        const top = section.getBoundingClientRect().top;
        if (top <= 180) current = link.id;
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={
          hidden && !mobileMenuOpen
            ? { y: -92, opacity: 0 }
            : { y: 0, opacity: 1 }
        }
        transition={{ duration: 0.38, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`flex w-full items-center justify-between border-b px-4 py-3  transition-all duration-300 md:px-10 ${
            scrolled
              ? "border-slate-200/80 backdrop-blur-2xl bg-white/[0.92] text-slate-950 shadow-[0_18px_70px_rgba(15,23,42,0.14)] "
              : "bg-none border-none text-white"
          }`}
        >
          <a href="#" aria-label="Simplview home">
            <Image src="/logo.png" width={150} height={150} alt="Simplview" />
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-current/10 bg-white/[0.12] p-1 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-black transition-all duration-300 ${
                    isActive
                      ? scrolled
                        ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                        : "bg-white text-slate-950 shadow-lg shadow-white/20"
                      : scrolled
                        ? "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                        : "text-white/[0.78] hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="/dashboard"
              className={`rounded-full px-4 py-2 text-sm font-black transition-all hover:-translate-y-0.5 ${
                scrolled
                  ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  : "text-white/[0.85] hover:bg-white/[0.12] hover:text-white"
              }`}
            >
              Start free
            </a>
            <a
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-black text-white shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500 active:scale-95"
            >
              Book demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className={`grid h-11 w-11 place-items-center rounded-full border transition-all active:scale-95 md:hidden ${
              scrolled
                ? "border-slate-200 bg-slate-950 text-white"
                : "border-white/[0.18] bg-white/[0.12] text-white"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-slate-950 text-white md:hidden"
          >
            <div className="absolute inset-0 bg-[url('/bg.gif')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/[0.88] to-slate-950" />

            <div className="relative flex min-h-full flex-col px-5 py-5">
              <div className="flex items-center justify-between">
                <a href="#" onClick={closeMenu} aria-label="Simplview home">
                  <Image
                    src="/logo.png"
                    width={154}
                    height={150}
                    alt="Simplview"
                  />
                </a>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.15] bg-white/10 text-white active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid flex-1 content-center gap-3 py-10">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 16, opacity: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.35 }}
                    className="group flex items-center justify-between rounded-lg border border-white/[0.12] bg-white/[0.08] px-5 py-4 text-2xl font-black tracking-tight backdrop-blur-xl transition-all active:scale-[0.98]"
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 text-sky-200 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                ))}
              </div>

              <div className="grid gap-3">
                <a
                  href="/dashboard"
                  onClick={closeMenu}
                  className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-slate-950 active:scale-[0.98]"
                >
                  Start free
                </a>
                <a
                  href="/dashboard"
                  onClick={closeMenu}
                  className="rounded-full border border-white/[0.15] bg-blue-600 px-6 py-4 text-center text-sm font-black text-white active:scale-[0.98]"
                >
                  Book a 20-min demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
