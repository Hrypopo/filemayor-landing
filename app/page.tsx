import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { WhatsNew } from '@/components/WhatsNew';
import { MissionControl } from '@/components/MissionControl';
import { MCPSection } from '@/components/MCPSection';
import { RealOutput } from '@/components/RealOutput';
import { ProofStrip } from '@/components/ProofStrip';
import { Pricing } from '@/components/Pricing';
import { FAQ, faqItems } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  description:
    'FileMayor is a free AI file organizer for Mac, Windows, and Linux. Scan any folder, get an AI-generated plan, apply with one command, undo instantly. Install free via npm.',
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <WhatsNew />
        <MissionControl />
        <MCPSection />
        <RealOutput />
        <ProofStrip />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: site.name,
            description: site.description,
            url: site.url,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Windows, macOS, Linux',
            softwareVersion: site.version,
            offers: [
              {
                '@type': 'Offer',
                name: 'Free',
                price: '0',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                name: 'Pro',
                price: site.pricing.pro.priceUsd.toString(),
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                name: 'Team',
                price: site.pricing.enterprise.priceUsd.toString(),
                priceCurrency: 'USD',
              },
            ],
            author: {
              '@type': 'Person',
              name: site.author.name,
              alternateName: site.author.handle,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((it) => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
          }),
        }}
      />
    </>
  );
}
