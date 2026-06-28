import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { WhatsNew } from '@/components/WhatsNew';
import { MissionControl } from '@/components/MissionControl';
import { MCPSection } from '@/components/MCPSection';
import { RealOutput } from '@/components/RealOutput';
import { ProofStrip } from '@/components/ProofStrip';
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
            applicationSubCategory: 'File Management',
            releaseNotes: `${site.url}/changelog`,
            downloadUrl: site.github.releases,
            installUrl: 'https://www.npmjs.com/package/filemayor',
            featureList: [
              'AI-powered folder diagnosis',
              'Reversible file moves with rollback journal',
              'Duplicate file detection and removal',
              'MCP server for Claude Desktop and Cursor',
              'CLI interface for scripting and automation',
              'Local-only execution — no file contents leave the machine',
              'Cross-platform: Mac, Windows, Linux',
            ].join(', '),
            offers: [
              {
                '@type': 'Offer',
                name: 'Free',
                price: 0,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
            ],
            author: {
              '@type': 'Person',
              name: site.author.name,
              alternateName: site.author.handle,
            },
            publisher: {
              '@type': 'Organization',
              name: site.name,
              url: site.url,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'FileMayor', item: site.url },
            ],
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
