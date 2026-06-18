import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FileMayor — Organizador de arquivos com IA, gratuito e reversível',
  description:
    'FileMayor organiza suas pastas com um plano de IA que você aprova primeiro — e um diário que torna cada operação reversível. Gratuito no Mac, Windows e Linux.',
  alternates: {
    canonical: 'https://filemayor.com/pt',
    languages: { 'en': 'https://filemayor.com', 'fr': 'https://filemayor.com/fr', 'pt': 'https://filemayor.com/pt' },
  },
};

const features = [
  {
    title: 'Diagnóstico com IA',
    body: 'Analise qualquer pasta e receba uma pontuação de saúde de 0 a 100, mais uma lista clara de problemas — duplicatas, arquivos antigos, capturas de tela em excesso.',
    cmd: 'filemayor explain ~/Downloads',
  },
  {
    title: 'Plano antes de tudo',
    body: 'FileMayor não move nada sem sua aprovação. Ele gera primeiro um plano detalhado com a justificativa de cada movimentação. Você aprova, aí ele age.',
    cmd: 'filemayor cure ~/Downloads',
  },
  {
    title: 'Desfazer total',
    body: 'Cada operação é registrada em um diário. Um único comando desfaz toda uma sessão — mesmo após uma queda do sistema. Seus arquivos voltam exatamente ao lugar original.',
    cmd: 'filemayor undo --all',
  },
  {
    title: 'Servidor MCP integrado',
    body: 'FileMayor se integra ao Claude Desktop, Claude Code ou Cursor via MCP. Descreva o que você quer em português — FileMayor executa com segurança.',
    cmd: 'npx -y filemayor-mcp',
  },
];

const faqs = [
  {
    q: 'O FileMayor envia meus arquivos para a nuvem?',
    a: 'Não. O motor roda inteiramente na sua máquina. Somente metadados (nomes, tamanhos, caminhos) são enviados ao provedor de IA quando você usa os comandos de IA. O conteúdo dos seus arquivos nunca sai do seu computador.',
  },
  {
    q: 'E se eu mudar de ideia depois de organizar?',
    a: 'Digite `filemayor undo --all`. Cada movimentação é registrada num diário write-ahead que sobrevive a quedas do sistema. Tudo volta exatamente ao lugar de origem.',
  },
  {
    q: 'É realmente gratuito?',
    a: 'Sim, completamente. Todos os recursos estão incluídos sem assinatura nem conta obrigatória. FileMayor é gratuito no Mac, Windows e Linux.',
  },
  {
    q: 'Funciona com o Claude em português?',
    a: 'Sim. Via servidor MCP, você pode dar instruções em português ao Claude: "Limpa minha pasta Downloads", "Arquiva tudo que for de antes de 2023". O Claude planeja, o FileMayor executa com segurança.',
  },
];

export default function PtPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: site.name,
            description: 'Organizador de arquivos com IA, gratuito e reversível.',
            url: 'https://filemayor.com/pt',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Windows, macOS, Linux',
            softwareVersion: site.version,
            offers: [{ '@type': 'Offer', price: '0', priceCurrency: 'BRL' }],
            inLanguage: 'pt-BR',
          }),
        }}
      />
      <Nav />
      <main id="main">
        {/* Hero */}
        <section className="border-b border-border py-24 md:py-32">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Organizador de arquivos com IA · Gratuito</div>
            <h1 className="h-display text-[clamp(40px,6vw,80px)]">
              Suas pastas,<br />
              <em className="not-italic text-accent italic">finalmente organizadas.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
              FileMayor analisa suas pastas, propõe um plano de reorganização que você aprova,
              executa — e pode desfazer tudo com um único comando. Gratuito no Mac, Windows e Linux.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/download" className="btn btn-primary">
                Baixar gratuitamente <span aria-hidden>→</span>
              </Link>
              <Link href="/mcp" className="btn btn-mono">
                Usar com Claude
              </Link>
            </div>
            <code className="mt-6 inline-block rounded-md border border-border bg-surface px-3 py-2 font-mono text-[14px] text-text">
              npm install -g filemayor
            </code>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {['Sempre gratuito', 'Nenhum dado na nuvem', 'Desfazer total', 'Mac · Windows · Linux'].map((p) => (
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
            <div className="section-label">Como funciona</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Diagnosticar. Planejar. Aplicar. Desfazer.
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
            <div className="section-label">Integração MCP · Claude Desktop · Cursor</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Peça ao Claude para organizar seus arquivos.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-2">
              Adicione uma entrada na sua config MCP e o Claude Desktop ou Claude Code
              pode diagnosticar suas pastas, propor um plano e executá-lo — com
              FileMayor como camada de segurança. Tudo é registrado e reversível.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-text-2">
              <code>{`{
  "mcpServers": {
    "filemayor": {
      "command": "npx",
      "args": ["-y", "filemayor-mcp"]
    }
  }
}`}</code>
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/mcp" className="btn btn-primary">
                Guia completo MCP <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border py-20 md:py-24">
          <div className="container-prose max-w-3xl">
            <div className="section-label">Perguntas frequentes</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-normal leading-tight tracking-tight">
              Perguntas frequentes
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
              Comece agora.<br />
              <em className="not-italic text-accent italic">É gratuito.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-2">
              Todos os recursos incluídos. Sem conta. Sem assinatura.
              Mac, Windows, Linux.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/download" className="btn btn-primary">
                Baixar FileMayor <span aria-hidden>→</span>
              </Link>
              <Link href="/" className="btn btn-mono">
                Versão em inglês
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
