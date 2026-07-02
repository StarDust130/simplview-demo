"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Simplview analyst studio", href: "http://chandrashekhar.me/how-it-works" },
  { label: "How it works", href: "http://chandrashekhar.me/how-it-works" },
  { label: "Pricing", href: "http://chandrashekhar.me/pricing" },
  { label: "Linkedin", href: "http://chandrashekhar.me/" },
];

const companyLinks = [
  { label: "About", href: "http://chandrashekhar.me/problems" },
  { label: "Blog", href: "http://chandrashekhar.me/" },
  { label: "Contact", href: "http://chandrashekhar.me/contact" },
  { label: "Book a Demo", href: "http://chandrashekhar.me/contact" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 bg-[url('/bg.gif')] bg-cover bg-center opacity-[0.18]" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/[0.94] to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 lg:grid-cols-[1.15fr_1fr_1fr]"
        >
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.08] p-5 backdrop-blur-xl">
            <a href={"http://chandrashekhar.me/"}>
              <Image src="/logo.png" width={150} height={150} alt="Simplview" />
            </a>
            <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-white/[0.72]">
              AI Business Intelligence for teams that need answers, not another
              dashboard to decode.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href="/dashboard"
                className="rounded-full bg-white px-4 py-3 text-center text-sm font-black text-slate-950 transition-all hover:-translate-y-0.5"
              >
                Start free
              </a>
              <a
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg border border-white/[0.12] bg-white/[0.06] p-4 backdrop-blur-xl">
            <nav>
              <h3 className="text-[11px] font-black uppercase text-sky-200">
                Product
              </h3>
              <ul className="mt-4 space-y-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-bold text-white/[0.76] transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav>
              <h3 className="text-[11px] font-black uppercase text-sky-200">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-bold text-white/[0.76] transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="rounded-lg border border-white/[0.12] bg-white/[0.08] p-5 backdrop-blur-xl">
            <h3 className="text-[11px] font-black uppercase text-sky-200">
              Contact
            </h3>
            <div className="mt-4 grid gap-3">
              <a
                href="mailto:hello@simplview.com"
                className="flex items-center gap-3 rounded-lg bg-white/[0.08] px-3 py-3 text-sm font-black text-white transition-all hover:bg-white/[0.12]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-slate-950">
                  <Mail className="h-4 w-4" />
                </span>
                hello@simplview.com
              </a>
              <div className="flex gap-3 rounded-lg bg-white/[0.08] px-3 py-3 text-sm font-bold leading-6 text-white/[0.72]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-slate-950">
                  <MapPin className="h-4 w-4" />
                </span>
                <p>
                  VK Education and Consulting Inc.
                  <br />
                  Brampton, ON, CA
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs font-bold text-white/[0.48] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 by VK Education and Consulting</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="http://chandrashekhar.me/"
              target="_blank"
              className="transition-colors hover:text-white"
            >
              Privacy
            </a>
            <a
              href="http://chandrashekhar.me/"
              target="_blank"
              
              className="transition-colors hover:text-white"
            >
              Terms
            </a>
            <a
              href="http://chandrashekhar.me/"
              target="_blank"
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              <span className="grid h-4 w-4 place-items-center rounded-sm bg-white/[0.14] text-[9px] text-white">
                in
              </span>
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
