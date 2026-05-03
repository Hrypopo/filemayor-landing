import type { Metadata } from 'next';
import { Article, P, H2, H3, Pull, Code, Ul, Li } from '@/components/Article';

export const metadata: Metadata = {
  title: 'Why FileMayor has three dependencies',
  description:
    'Most modern tools are dependency forests. FileMayor was built with a different constraint.',
};

export default function Post() {
  return (
    <Article
      header={{
        kicker: 'Engineering · trust',
        title: "Why FileMayor has three dependencies (and you don’t need more).",
        dek: 'Most modern tools are dependency forests. FileMayor was built with a different constraint.',
        date: '2026.04.26',
        readTime: '5 min read',
      }}
    >
      <P>
        Most modern tools are dependency forests. You install one package, and it quietly
        pulls in hundreds more — each with its own assumptions, risks, and maintenance
        burden. This is not a moral failing. It is how software has evolved: modular,
        composable, and fast to build.
      </P>
      <P>
        But it comes at a cost.
      </P>
      <P>
        Every dependency you add becomes part of your trusted computing base. Every
        transitive dependency becomes something you are implicitly executing on your
        machine. And if your tool touches the filesystem — renaming, moving, deleting
        files — that trust boundary matters.
      </P>
      <Pull>
        Minimize the number of things that can break, misbehave, or be compromised between
        intent and execution.
      </Pull>
      <P>
        FileMayor ships with three runtime dependencies: <Code>electron-updater</Code>,{' '}
        <Code>tar</Code>, <Code>yauzl</Code>. That is the entire list.
      </P>

      <H2>Why this matters</H2>
      <H3>1. Supply chain risk is real</H3>
      <P>
        When you install a tool globally, you are not just installing its code — you are
        installing its entire dependency tree. In some cases, that tree spans hundreds of
        packages.
      </P>
      <P>Each one:</P>
      <Ul>
        <Li>can publish a malicious update</Li>
        <Li>can be abandoned and later hijacked</Li>
        <Li>can introduce subtle bugs or breaking changes</Li>
      </Ul>
      <P>
        Reducing dependencies does not eliminate risk. But it shrinks the attack surface
        dramatically.
      </P>

      <H3>2. Determinism over convenience</H3>
      <P>A smaller dependency set means fewer version conflicts, fewer breaking upgrades, and more predictable builds. When FileMayor analyzes or modifies your filesystem, it does so in a controlled and auditable environment. There are fewer moving parts, and therefore fewer surprises.</P>

      <H3>3. Performance is a side effect</H3>
      <P>
        Lean dependencies reduce install size, improve startup time, and lower memory
        overhead. But performance is not the primary goal. It is a consequence of
        restraint.
      </P>

      <H2>Why not zero?</H2>
      <P>
        &quot;Zero dependency&quot; is a popular claim. It is also often misleading.
      </P>
      <P>
        FileMayor uses three carefully selected packages for specific, constrained
        purposes — update delivery and archive handling. Rewriting these from scratch
        would increase maintenance burden, introduce new untested code paths, and
        distract from the core problem FileMayor solves.
      </P>
      <Pull>
        The goal is not purity. The goal is intentionality.
      </Pull>

      <H2>The real philosophy</H2>
      <P>
        FileMayor does not try to eliminate complexity. It tries to own it. Every
        dependency is understood, reviewed, and justified. Everything else is built
        in-house, where behavior can be reasoned about and controlled.
      </P>
      <P>
        When you run FileMayor, you are not running a sprawling ecosystem of unknown code.
        You are running a focused tool with a narrow, deliberate surface area — designed
        to explain what it will do, give you control over how it does it, and execute
        safely with rollback.
      </P>
      <P>
        In a world where software increasingly abstracts away its own complexity,
        FileMayor takes the opposite approach: make fewer assumptions, depend on fewer
        things, do the job well.
      </P>
    </Article>
  );
}
