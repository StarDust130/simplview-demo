import { DataPrivacySection } from "@/components/landing/data-privacy-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProblemsSection } from "@/components/landing/problems-section";
import { ProductVideoShowcase } from "@/components/landing/product-video-showcase";
import { SiteHeader } from "@/components/landing/site-header";
import { StatisticsSection } from "@/components/landing/statistics-section";
import { WhySimplviewSection } from "@/components/landing/why-simplview-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <SiteHeader />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Product Video Showcase */}
        <ProductVideoShowcase />

        {/* Statistics */}
        <StatisticsSection />

        {/* Problems */}
        <ProblemsSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Why Simplview */}
        <WhySimplviewSection />

        {/* Data Privacy */}
        <DataPrivacySection />

        {/* Final CTA */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
