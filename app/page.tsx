import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { CurativeTriad } from '@/components/CurativeTriad';
import { ThreeSurfaces } from '@/components/ThreeSurfaces';
import { WhyFileMayor } from '@/components/WhyFileMayor';
import { ChevzaDoctrine } from '@/components/ChevzaDoctrine';
import { OpenMetrics } from '@/components/OpenMetrics';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <CurativeTriad />
        <ThreeSurfaces />
        <WhyFileMayor />
        <ChevzaDoctrine />
        <OpenMetrics />
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
            ],
            author: {
              '@type': 'Person',
              name: site.author.name,
              alternateName: site.author.handle,
            },
          }),
        }}
      />
    </>
  );
}
