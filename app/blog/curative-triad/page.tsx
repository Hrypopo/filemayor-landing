import type { Metadata } from 'next';
import { Article, P, H2, H3, Pull, Pre, Ul, Li } from '@/components/Article';

export const metadata: Metadata = {
  title: 'The Curative Triad: separating planning from execution',
  description:
    'Most file tools act immediately. FileMayor introduces a boundary between understanding, planning, and action.',
};

export default function Post() {
  return (
    <Article
      header={{
        kicker: 'Architecture · pattern',
        title: 'The Curative Triad: separating planning from execution.',
        dek: 'Most file tools act immediately. FileMayor introduces a boundary between understanding, planning, and action.',
        date: '2026.04.26',
        readTime: '6 min read',
      }}
    >
      <P>
        Most file organization tools do one thing: they act. You click a button, and your
        files are moved, renamed, or deleted. The logic may be sophisticated, even
        AI-powered, but the interaction model is the same — input flows directly to
        action.
      </P>
      <P>
        FileMayor takes a different approach. It introduces a separation between
        understanding, planning, and execution.
      </P>
      <Pull>explain → cure → apply</Pull>
      <P>This is the Curative Triad.</P>

      <H2>Why separation matters</H2>
      <P>
        When software acts too quickly, it removes your ability to reason about its
        behavior. This is especially dangerous when dealing with large directories, mixed
        file types, and ambiguous naming conventions. You do not just want results. You
        want confidence.
      </P>

      <H3>Step 1 — explain</H3>
      <Pre>$ filemayor explain ~/Downloads</Pre>
      <P>
        This step modifies nothing. It analyzes your files, categorizes them, and surfaces
        patterns — duplicates, large files, misplacements. The goal is simple: make the
        state of your filesystem legible.
      </P>

      <H3>Step 2 — cure</H3>
      <Pre>$ filemayor cure ~/Downloads</Pre>
      <P>
        Now FileMayor proposes a plan: where files should go, how they should be grouped,
        what should be removed or deduplicated. Nothing is applied yet. You are looking at
        a draft of the future state. This is the critical step most tools skip.
      </P>

      <H3>Step 3 — apply</H3>
      <Pre>$ filemayor apply</Pre>
      <P>
        Only now does FileMayor act. And when it does, every change is tracked, every
        operation is reversible, the system remains observable.
      </P>

      <H2>Planning vs execution</H2>
      <P>The Triad enforces a boundary:</P>
      <Ul>
        <Li>Planning can be complex, exploratory, even probabilistic.</Li>
        <Li>Execution must be deterministic, safe, and reversible.</Li>
      </Ul>
      <P>
        By separating the two, FileMayor avoids a common failure mode of AI tools:
        confident decisions applied without visibility or control.
      </P>

      <H2>Psychological safety</H2>
      <P>
        There is a subtle effect here. When you know that nothing happens without your
        approval, every step is visible, and every action can be undone, you are more
        willing to run the tool on important directories, experiment with strategies, and
        trust the system over time.
      </P>

      <H2>The deeper idea</H2>
      <P>
        The Curative Triad is not just a feature. It is a pattern. It can be applied to
        infrastructure changes, database migrations, any system where actions are costly
        or irreversible.
      </P>
      <Pull>Understand first. Plan second. Act last.</Pull>
      <P>
        File organization is not just about moving files. It is about making decisions on
        your behalf. The Triad ensures those decisions are visible, reviewable,
        controlled. And that makes all the difference.
      </P>
    </Article>
  );
}
