import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Problems", href: "#problems" },
  { label: "Workflow", href: "#workflow" },
  { label: "Security", href: "#privacy" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Simplview home"
        >
          <Image
            src="/Simplview-Logo.avif"
            alt="Simplview"
            width={170}
            height={42}
            priority
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          asChild
          className="h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          <a href="#cta">
            Book demo
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </header>
  );
}
