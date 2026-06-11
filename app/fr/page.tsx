import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FileMayor — Organiseur de fichiers IA, gratuit et réversible',
  description:
    "FileMayor organise vos dossiers avec un plan IA que vous approuvez d'abord — et un journal qui rend chaque opération réversible. Gratuit sur Mac, Windows et Linux.",
  alternates: {
    canonical: 'https://filemayor.com/fr',
    languages: { en: 'https://filemayor.com', fr: 'https://filemayor.com/fr', pt: 'https://filemayor.com/pt' },
  },
};

const features = [
  {
    title: 'Diagnostic IA',
    body: "Scannez n'importe quel dossier et obtenez un score de santé de 0 à 100, plus une liste claire des problèmes — doublons, archives périmées, captures d'écran en masse.",
    cmd: 'filemayor explain ~/Téléchargements',
  },
  {
    title: 'Plan avant tout',
    body: "FileMayor ne déplace rien sans votre accord. Il génère d'abord un plan détaillé, avec la justification de chaque déplacement. Vous approuvez, puis il agit.",
    cmd: 'filemayor cure ~/Téléchargements',
  },
  {
    title: 'Annulation totale',
    body: 'Chaque opération est journalisée. Une seule commande suffit pour annuler toute une session — même après un crash. Vos fichiers retrouvent leur place exacte.',
    cmd: 'filemayor undo --all',
  },
  {
    title: 'Serveur MCP intégré',
    body: "FileMayor s'intègre à Claude Desktop, Claude Code ou Cursor via MCP. Décrivez ce que vous voulez en français — FileMayor exécute en toute sécurité.",
    cmd: 'npx -y @filemayor/mcp',
  },
];

const faqs = [
  {
    q: 'FileMayor envoie-t-il mes fichiers dans le cloud ?',
    a: "Non. Le moteur tourne entièrement sur votre machine. Seules les métadonnées (noms, tailles, chemins) sont envoyées à votre fournisseur IA si vous utilisez les commandes IA. Le contenu de vos fichiers ne quitte jamais votre ordinateur.",
  },
  {
    q: "Que se passe-t-il si je change d'avis après une organisation ?",
    a: "Tapez `filemayor undo --all`. Chaque déplacement est enregistré dans un journal write-ahead qui survit aux crashes. Tout revient exactement à son emplacement d'origine.",
  },
  {
    q: 'Est-ce vraiment gratuit ?',
    a: 'Oui, entièrement. Toutes les fonctionnalités sont incluses sans abonnement ni compte requis. FileMayor est gratuit sur Mac, Windows et Linux.',
  },
  {
    q: 'Fonctionne-t-il avec Claude en français ?',
    a: "Oui. Via le serveur MCP, vous pouvez donner des instructions en français à Claude : \"Nettoie mon dossier Téléchargements\", \"Archive tout ce qui date d'avant 2023\". Claude planifie, FileMayor exécute de façon sécurisée.",
  },
];

export default function FrPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: site.name,
            description: 'Organiseur de fichiers IA, gratuit et réversible.',
            url: 'https://filemayor.com/fr',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Windows, macOS, Linux',
            softwareVersion: site.version,
            offers: [{ '@type': 'Offer', price: '0', priceCurrency: 'EUR' }],
            inLanguage: 'fr',
          }),
        }}
      />
      <Nav />
      <main id="main">
        {/* Hero */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Organiseur de fichiers IA · Gratuit</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Vos dossiers,<br />
              <em className="not-italic text-accent italic">enfin organisés.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              FileMayor analyse vos dossiers, propose un plan de réorganisation que vous approuvez,
              l&apos;exécute — et peut tout annuler d&apos;un seul coup. Gratuit sur Mac, Windows et Linux.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Télécharger gratuitement <span aria-hidden>→</span>
              </Link>
              <Link href="/mcp" className="btn btn-mono">
                Utiliser avec Claude
              </Link>
            </div>
            <code className="mt-6 inline-block rounded-md border border-border bg-surface px-3 py-2 font-mono text-[14px] text-text">
              npm install -g filemayor
            </code>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {['Gratuit, toujours', 'Aucune donnée dans le cloud', 'Annulation totale', 'Mac · Windows · Linux'].map((p) => (
                <li key={p} className="flex items-center gap-2 font-mono text-[12px] text-text-3">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose">
            <div className="section-label">Fonctionnement</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Diagnostiquer. Planifier. Appliquer. Annuler.
            </h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-2">
              {features.map((f, i) => (
                <li key={f.title} className="rounded-2xl border border-border bg-surface p-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-3 font-display text-[22px] font-normal leading-tight text-text">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-2">{f.body}</p>
                  <code className="mt-4 block rounded-md border border-border bg-bg px-3 py-2 font-mono text-[12px] text-text">
                    {f.cmd}
                  </code>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* MCP callout */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Intégration MCP · Claude Desktop · Cursor</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Dites à Claude de ranger vos fichiers.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-2">
              Ajoutez une entrée dans votre config MCP et Claude Desktop ou Claude Code
              peut diagnostiquer vos dossiers, proposer un plan et l&apos;exécuter — avec
              FileMayor comme couche de sécurité. Tout est journalisé et réversible.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "@filemayor/mcp"]
    }
  }
}`}</code>
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/mcp" className="btn btn-primary">
                Guide complet MCP <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Questions fréquentes</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Questions fréquentes
            </h2>
            <dl className="mt-10 space-y-8">
              {faqs.map((item) => (
                <div key={item.q} className="border-t border-border pt-6">
                  <dt className="font-display text-[20px] font-normal leading-snug text-text">
                    {item.q}
                  </dt>
                  <dd className="mt-3 text-[15.5px] leading-relaxed text-text-2">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container-prose max-w-2xl text-center">
            <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-normal leading-tight tracking-tight">
              Commencez maintenant.<br />
              <em className="not-italic text-accent italic">C&apos;est gratuit.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-2">
              Toutes les fonctionnalités incluses. Aucun compte. Aucun abonnement.
              Mac, Windows, Linux.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/download" className="btn btn-primary">
                Télécharger FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/" className="btn btn-mono">
                Version anglaise
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
