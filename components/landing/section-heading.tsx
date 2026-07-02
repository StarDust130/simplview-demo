import { cn } from "@/lib/utils";

import { FadeIn } from "./motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="text-sm font-semibold text-brand">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
        {description}
      </p>
    </FadeIn>
  );
}
