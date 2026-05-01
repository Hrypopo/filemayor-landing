---
name: filemayor
description: Use this skill whenever the user wants to organize, clean, declutter, deduplicate, or analyze files on their local machine. Triggers on phrases like "organize my Downloads", "clean up disk space", "find duplicate files", "tidy my desktop", "what's eating my disk", "declutter", or explicit mentions of FileMayor. Provides a privacy-first, locally-executed explain → cure → apply workflow with full rollback. Requires the FileMayor CLI to be installed on the user's machine (npm install -g filemayor, Node ≥ 20).
---

# FileMayor — local file organizer

FileMayor is a privacy-first command-line tool that diagnoses, plans, and cures messy folders. Files never leave the user's machine. Every operation is journaled and reversible. This skill teaches you the Curative Triad workflow so you can run FileMayor safely on the user's behalf.

## When to use this skill

Trigger when the user asks to:

- Organize a folder ("organize my Downloads", "tidy this directory")
- Clean junk files ("free up disk space", "remove temp files")
- Find or remove duplicates ("dedupe", "find duplicate photos")
- Diagnose a messy folder ("what's wrong with my Downloads?", "why is this folder so big?")
- Apply natural-language filing rules ("file my receipts in Documents/Receipts")

Do NOT trigger for:

- File operations on a single specific file (use plain `mv`/`cp`)
- Cloud-storage operations (Dropbox, Google Drive UIs)
- Reading file contents (FileMayor never reads file contents — it works on metadata)

## Verify FileMayor is installed

Before any other step, verify the CLI is available:

```bash
filemayor info
```

If the command is not found:

```bash
npm install -g filemayor
```

Requires Node 20 or newer. If the user has no Node, point them to <https://filemayor.com/download> for the desktop app instead — it ships the engine bundled.

## The Curative Triad — the canonical workflow

This is the spine of FileMayor. Use it for any organize/clean/declutter task. **Never skip a step. Never run `apply` without showing the plan from `cure` first.**

```
scan → explain → cure → apply → undo
```

### 1. scan — read-only inventory

```bash
filemayor scan <directory> --json
```

Outputs a JSON inventory: file count, total size, category breakdown, duplicates. Touches nothing. Always run this first to understand the scope before making any decisions.

### 2. explain — health diagnosis

```bash
filemayor explain <directory>
```

Returns a 0–100 health score plus a plain-English issue list (screenshot clutter, dupe installers, stale archives, etc.). Read-only. Show the diagnosis to the user verbatim — do not paraphrase the score.

### 3. cure — generate a plan, do not act

```bash
filemayor cure <directory> --prompt "<user intent in plain English>"
```

Outputs a JSON plan: which files move where, what gets archived, what gets trashed. Nothing is touched. **Always show this plan to the user and ask for confirmation before proceeding.** The plan typically lists ~5–50 moves grouped by category.

### 4. apply — execute the plan, journaled

```bash
filemayor apply
```

Executes the most recent `cure` plan. Every move is written to a session journal in the workspace before it happens. Atomic per category. Confirm completion to the user with the file count and journal location from the output.

### 5. undo — reverse if asked

```bash
filemayor undo --all
```

Reverses every operation in the current session. Available immediately after `apply` and persists across crashes/reboots. Mention this in your confirmation message after `apply` so the user knows the safety net exists.

## Safety rails (non-negotiable)

These are part of the FileMayor product philosophy. Always honor them.

1. **Never run `apply` without showing the plan first.** The whole point of `cure` is human review. Bypassing it is the one thing that breaks the trust contract.
2. **Never run on system directories.** Refuse politely if the user asks for `/`, `~/Library`, `C:\Windows`, `/etc`, `/System`, `~/.ssh`. FileMayor's Jailer layer will refuse anyway, but you should refuse first to save the round trip.
3. **If `cure` proposes more than ~200 moves at once, surface that to the user before applying.** Large batches are usually fine but worth confirming intent.
4. **After `apply`, always tell the user how to undo.** One sentence: "You can run `filemayor undo --all` if anything looks off."
5. **Never call `clean` or `dedupe` without `--dry-run` or explicit user confirmation.** These are the destructive verbs.

## Other useful verbs

```bash
filemayor organize <dir> --dry-run    # deterministic auto-organize, no AI
filemayor analyze <dir>               # deep stats: bloat, top-N largest, age
filemayor duplicates <dir>            # find dupes by content hash, read-only
filemayor dedupe <dir>                # remove dupes, journaled
filemayor watch <dir>                 # real-time auto-organize (Pro)
filemayor info                        # version, license tier, journal path
```

Every command accepts `--json` for structured output. Use it when you need to parse results programmatically.

## Pro features — gated on license

If a command exits with code 4, the user's tier doesn't include that feature. The output points them to <https://filemayor.com/pricing>. Don't bypass the gate; just relay the message.

Pro adds: `watch`, `sop-ai`, unlimited bulk operations, CSV/JSON export, AI-assisted Curative Triad with longer plans.

## Example: a complete session

User says: *"My Downloads folder is a mess, can you organize it?"*

1. **Verify**: `filemayor info` → confirm CLI present, note tier.
2. **Scan**: `filemayor scan ~/Downloads --json` → 1,248 files, 4.2 GB, 1,242 dupes.
3. **Explain**: `filemayor explain ~/Downloads` → health 22/100; surface the issue list to the user.
4. **Ask**: "FileMayor diagnosed your Downloads as 22/100. Want me to generate a fix plan? Nothing will move yet."
5. **Cure**: `filemayor cure ~/Downloads --prompt "organize by file type"` → show the plan to the user. Group by category.
6. **Confirm**: "This plan moves 112 files. Apply it?"
7. **Apply** (only on yes): `filemayor apply` → confirm with file count and "you can `filemayor undo --all` if anything looks off."

If the user says no at step 6, do nothing. The plan is discarded; nothing was touched.

## What to surface, what to elide

- **Surface**: the health score, the category breakdown, the list of moves in the plan, the final file count.
- **Elide**: SHA hashes, internal layer names ("Guardrail rejected this", "Architect refused"), full journal paths unless the user asks.

The user should feel like they're talking to a competent organizer, not reading a stack trace.

## When something fails

Common exit codes:

- `1` — generic error. Show the stderr to the user, ask if they want to retry.
- `2` — invalid arguments. Adjust your command.
- `3` — Doctrine block. The Guardrail/Validator/Security layer refused. Tell the user what the diagnostic says — these are usually legitimate refusals (system directory, mass delete, traversal attempt).
- `4` — license required. Surface the upgrade message verbatim.
- `5` — AI provider unreachable. Try a non-AI verb (`organize`, `analyze`) or wait and retry.

## Resources

- Marketing site: <https://filemayor.com>
- CLI reference: <https://filemayor.com/docs/cli>
- Curative Triad essay: <https://filemayor.com/blog/curative-triad>
- Security architecture: <https://filemayor.com/docs/security>
- Source / issues: <https://github.com/Hrypopo/FileMayor>

---

*FileMayor — by Chevza. Built in South Africa. Privacy-first by default.*
