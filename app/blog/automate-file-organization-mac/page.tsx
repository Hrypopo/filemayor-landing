import type { Metadata } from 'next';
import Link from 'next/link';
import { Article, P, H2, Pull, Ul, Li } from '@/components/Article';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to automate file organization on Mac (without breaking anything)',
  url: 'https://filemayor.com/blog/automate-file-organization-mac',
  datePublished: '2026-06-03',
  author: { '@type': 'Person', name: 'Lehlohonolo Goodwill Nchefu' },
  publisher: { '@type': 'Organization', name: 'FileMayor' },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://filemayor.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://filemayor.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to automate file organization on Mac (without breaking anything)', item: 'https://filemayor.com/blog/automate-file-organization-mac' },
  ],
};

export const metadata: Metadata = {
  title: 'How to automate file organization on Mac (without breaking anything)',
  description:
    'Three approaches to automatic file organization on macOS — folder actions, Hazel rules, and AI-planned CLI tools — with honest tradeoffs for each.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to automate file organization on Mac',
  description: 'Three approaches to automatic file organization on macOS — folder actions, Hazel rules, and AI-planned CLI tools — with honest tradeoffs for each.',
  tool: [{ '@type': 'HowToTool', name: 'FileMayor CLI' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Install FileMayor',
      text: 'Run `npm install -g filemayor` in your terminal. FileMayor runs on Node ≥20 and works on macOS, Windows, and Linux.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Scan and diagnose your folder',
      text: 'Run `filemayor explain ~/Downloads` to get a health score (0–100), a list of identified issues, and an estimated savings in MB.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Generate a reorganisation plan',
      text: 'Run `filemayor cure ~/Downloads --prompt "group by type, archive anything older than 6 months"`. FileMayor proposes a set of moves in plain English — nothing is changed yet.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review and apply the plan',
      text: 'Run `filemayor apply` to execute the plan. Every move is written to a journal before it happens.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Undo if needed',
      text: 'Run `filemayor undo` at any time to reverse the entire session. The journal survives crashes.',
    },
  ],
};

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Article
        header={{
          kicker: 'Guide · automation',
          title: 'How to automate file organization on Mac (without breaking anything).',
          dek: 'Three approaches to automatic file organization on macOS — folder actions, Hazel rules, and AI-planned CLI tools — with honest tradeoffs for each.',
          date: '2026.06.03',
          readTime: '7 min read',
        }}
      >
        <P>
          There is a version of Mac file organization that runs itself. New files route to
          the right folders automatically, old downloads age out without manual review, and
          the chaos that accumulates over months stays contained. Getting there takes some
          setup — but once it is in place, you stop thinking about it.
        </P>
        <P>
          There are three main approaches, and they suit different kinds of users. This
          guide walks through each one honestly, including where each falls short.
        </P>

        <H2>Built-in Mac Folder Actions</H2>
        <P>
          macOS has supported Folder Actions since OS X — small Automator workflows or
          AppleScripts that trigger when files are added to a specific folder. You attach
          a script to a folder in Finder, and macOS runs it whenever something new lands.
        </P>
        <P>
          The appeal is obvious: no third-party software, no subscription, built right in.
          And for simple rules — rename a file, move a screenshot — Folder Actions work.
        </P>
        <P>
          The limitations surface quickly. Folder Actions are per-folder and do not compose
          well. The scripting environment is Apple-specific and dated. Debugging a broken
          Automator workflow can eat an afternoon. And there is no concept of undo — if a
          script moves or renames files incorrectly, you are recovering manually.
        </P>
        <Ul>
          <Li><strong>Good for:</strong> simple, single-folder rules on macOS that you only need to write once.</Li>
          <Li><strong>Bad for:</strong> complex conditions, multiple folders, cross-platform use, or anything where you might need to reverse what happened.</Li>
        </Ul>

        <H2>Rules-based tools (Hazel)</H2>
        <P>
          Hazel has been the reference for Mac file automation for over a decade. It runs
          as a System Preferences pane, watches whichever folders you configure, and
          applies IF/THEN rules whenever new files arrive. Rules can match on name,
          content, date, file type, tags, and more, and you can chain them with
          subfolders, AppleScript, and shell scripts.
        </P>
        <P>
          The power is real. A well-maintained set of Hazel rules handles an enormous
          range of scenarios: rename receipts, sort photos by date, move installers to
          a Software folder and clean up the DMG after it is installed. Power users build
          elaborate rule trees that effectively give their Mac a filing brain.
        </P>
        <P>
          The cost is maintenance. Every new file type, every edge case, every folder you
          add to your workflow is a rule that needs writing and testing. Rules can conflict.
          Moving to a new machine means exporting and reimporting everything. And like
          Folder Actions, Hazel does not provide an undo for batched moves — once it runs,
          it ran.
        </P>
        <Ul>
          <Li><strong>Good for:</strong> power users who want precise control, live on macOS exclusively, and enjoy maintaining a rules library.</Li>
          <Li><strong>Bad for:</strong> anyone who wants to describe intent rather than enumerate conditions, or who needs Windows or Linux support.</Li>
        </Ul>

        <H2>AI-planned approach (FileMayor)</H2>
        <P>
          The third approach flips the model. Instead of writing rules first, you describe
          what you want, get a plan, review it, and apply it. The AI handles the logic of
          categorisation and routing; you handle the approval.
        </P>
        <P>
          FileMayor works this way. You run <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">filemayor cure ~/Downloads</code> and it
          returns a structured plan: which files go where, which duplicates to remove,
          which stale items to archive. Nothing moves until you approve. And when you
          apply, every operation is journaled so <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[14px]">filemayor undo --all</code> reverses
          the entire session if the plan was wrong about something.
        </P>
        <P>
          For ongoing watch mode — routing new files as they arrive — FileMayor watches
          a folder and applies a plain-English policy you define once. No rule syntax to
          learn. If you change your mind, you update the policy and the next session
          reflects it.
        </P>
        <Pull>The safest automation is one you can undo.</Pull>
        <Ul>
          <Li><strong>Good for:</strong> bulk cleanup sessions, anyone who prefers describing intent over writing rules, and cross-platform teams.</Li>
          <Li><strong>Bad for:</strong> users who want fine-grained IF/THEN control over every condition, or who need deep AppleScript integration.</Li>
        </Ul>

        <H2>Choosing the right tool</H2>
        <P>
          The right answer depends on how you think about the problem. If you find it
          satisfying to specify exactly what should happen under every condition, Hazel is
          yours. If you just want the mess dealt with — reviewably, reversibly — FileMayor
          is likely a better fit.
        </P>
        <P>
          Many people run both: Hazel governs a watched inbox with precise conditions,
          while FileMayor handles the larger periodic cleanups that no rule set covers well.
          Folder Actions can cover the very simple cases in between without any added
          dependencies.
        </P>
        <P>
          Start with the approach that matches how you already think. Automation that
          requires constant maintenance is not automation — it is just a different kind
          of manual work.
        </P>
        <P>
          If you want to try the AI-planned approach without committing to anything,{' '}
          <Link href="/download" className="text-text-2 underline-offset-2 hover:text-accent hover:underline">
            FileMayor is free to install →
          </Link>
        </P>
      </Article>
    </>
  );
}
