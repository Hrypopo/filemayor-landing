# FileMayor skill — for Claude, Cowork, and other LLM agents

Install this skill so your LLM can organize files on your behalf using the
FileMayor CLI, with the full Curative Triad safety model intact.

## Prerequisites

- **Node.js 20+** on the machine where the LLM will run commands.
- **FileMayor CLI installed** globally:

  ```bash
  npm install -g filemayor
  ```

- An LLM agent that supports skills — Claude Code, Cowork, or any client
  that loads SKILL.md prompts.

## Install in Claude Code

Skills live under `~/.claude/skills/`. Drop the `filemayor` folder there:

```bash
git clone https://github.com/Hrypopo/filemayor-landing.git /tmp/filemayor-skill
mkdir -p ~/.claude/skills
cp -r /tmp/filemayor-skill/skill ~/.claude/skills/filemayor
rm -rf /tmp/filemayor-skill
```

Restart Claude Code. Verify the skill loaded:

```
/skills
```

You should see `filemayor` in the list. From now on, prompts like
*"organize my Downloads"* or *"what's eating my disk"* trigger the skill.

## Install in Cowork

Cowork installs skills via plugins. Open the plugin marketplace inside
Cowork and search for FileMayor (or paste the GitHub URL of this skill
folder). Or copy the folder into your Cowork skills directory manually
following the same pattern as Claude Code above.

## Install in any MCP-compatible client

For clients that use the Model Context Protocol — Claude Desktop, Cursor,
custom agents — an MCP server is the cleanest fit. We're building one;
track progress at <https://github.com/Hrypopo/FileMayor/issues>.

In the meantime, this SKILL.md works in any agent that supports system
prompts: paste its contents into the agent's system prompt or
"instructions" field, ensure the agent has a shell tool, and you're done.

## What the skill does

It teaches the LLM:

- The Curative Triad workflow: `scan → explain → cure → apply → undo`
- How to verify FileMayor is installed before doing anything
- Five non-negotiable safety rails (e.g. always show the plan before
  applying, never operate on system directories)
- How to interpret exit codes
- What to surface to the user vs. what to elide

It is intentionally short. The full architecture details live at
<https://filemayor.com/docs/security> for users who want the long form.

## Safety guarantees that survive being inside an LLM

Even if the LLM ignores the SKILL.md instructions:

- The CLI itself enforces the Doctrine. The Jailer refuses system paths.
  The Guardrail refuses destructive batches. The Architect rejects
  domain-scattering plans. These run inside the binary — no prompt can
  bypass them.
- Every move is journaled. `filemayor undo --all` is always available.
- Files never leave the machine. The AI calls (Gemini 2.0 Flash) only
  receive metadata. Disable AI entirely with `FILEMAYOR_AI=off` env var.

## Updating

```bash
cd ~/.claude/skills/filemayor
git pull origin main
```

Or re-run the install steps above.

## License

The skill is MIT-licensed for portability. The FileMayor CLI itself
is proprietary; see <https://filemayor.com/terms>.

— Chevza
