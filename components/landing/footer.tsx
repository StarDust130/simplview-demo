import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Product", href: "#product" },
  { label: "Problems", href: "#problems" },
  { label: "Workflow", href: "#workflow" },
  { label: "Privacy", href: "#privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
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

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
