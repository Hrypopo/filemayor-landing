import type { Metadata } from 'next';
import Link from 'next/link';
import { Article, P, H2, H3, Pull } from '@/components/Article';

export const metadata: Metadata = {
  title: 'Inside the Chevza Doctrine',
  description:
    'How FileMayor allows intelligent planning without risking uncontrolled execution.',
};

export default function Post() {
  return (
    <Article
      header={{
        kicker: 'Security · architecture',
        title: 'Inside the Chevza Doctrine: six layers between an AI plan and your filesystem.',
        dek: 'How FileMayor allows intelligent planning without risking uncontrolled execution.',
        date: '2026.04.26',
        readTime: '7 min read',
      }}
    >
      <P>
        FileMayor operates on one of the most sensitive surfaces in computing — your
        filesystem. It can move files, rename them, delete them, reorganize entire
        directory trees. Introducing AI into this environment creates a problem.
      </P>
      <Pull>
        How do you allow intelligent planning without risking uncontrolled execution?
      </Pull>
      <P>
        The answer is the Chevza Doctrine — a layered safety architecture that sits
        between intent and action.
      </P>

      <H2>The principle</H2>
      <P>
        No single component should have the authority to decide, validate, and execute.
        Instead, FileMayor splits responsibility across six layers.
      </P>

      <H3>1. Jail</H3>
      <P>
        The Jailer constrains scope. It is symlink-aware. It ensures operations are
        limited to allowed directories and refuses any path that escapes the intended
        boundary, including indirect paths through symlinks.
      </P>

      <H3>2. Vault</H3>
      <P>
        The Vault holds secrets — license keys, AI provider credentials, webhook signing
        secrets. They live in the OS keychain, never on disk in plaintext.
      </P>

      <H3>3. Guardrail</H3>
      <P>
        The Guardrail inspects every batch the AI returns, before validation. It
        pattern-matches against destructive shapes — mass-deletes beyond a threshold,
        recursive renames over protected paths, ambiguous overwrites. These are hard
        constraints, not suggestions.
      </P>

      <H3>4. Halt</H3>
      <P>
        The Halt layer treats the journal as durable state. Every move writes its intent
        to disk before the move happens, and writes its completion after. Forced shutdown
        mid-operation always rolls back cleanly. There is no half-applied state.
      </P>

      <H3>5. Architect</H3>
      <P>
        The Architect validates the plan as a whole. It refuses domain-scattering moves
        that would split semantically related files. It detects circular dependencies
        between operations. Plans that fail validation never reach execution.
      </P>

      <H3>6. Security</H3>
      <P>
        The final boundary. Path traversal checks, rate limiting, input validation. The
        layer with the fewest interesting decisions and the most consequential bugs if it
        ever fails.
      </P>

      <H2>Why layers matter</H2>
      <P>
        A single safety check is fragile. Layered systems are resilient because failure in
        one layer is caught by another, responsibilities are isolated, and behavior is
        easier to reason about.
      </P>

      <H2>AI plus safety</H2>
      <P>
        AI systems are powerful because they generalize. They are risky for the same
        reason. The Doctrine ensures that AI can propose, but cannot directly execute.
        There is always a boundary.
      </P>

      <H2>What this means in practice</H2>
      <P>
        When you run FileMayor: the AI suggests a plan, the Doctrine validates it, the
        execution engine applies it safely, and you can undo it. At no point does a single
        component control the entire flow.
      </P>

      <H2>Closing</H2>
      <P>
        Most tools treat safety as a feature. FileMayor treats it as architecture. The
        Chevza Doctrine is not visible in the UI. You will not see it when things go
        right. But it is the reason things do not go wrong. And when you are dealing with
        your filesystem, that is what matters.
      </P>
      <P>
        For the canonical reference — code locations, exit codes, vulnerability disclosure
        process — see{' '}
        <Link href="/docs/security" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
          /docs/security
        </Link>
        .
      </P>
    </Article>
  );
}
