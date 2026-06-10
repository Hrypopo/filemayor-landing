# Changelog

All notable changes to FileMayor will be documented in this file.

## [4.0.5] — 2026-06-09

### 🎉 Everything is free
- **Every feature open to all users** — Watch Mode, AI SOP Engine, unlimited bulk organize, and CSV export now ship in the free tier. No license required. The tier system and Ed25519 license verification remain in place for the future.
- Removed the upgrade modal and all checkout links.
- Settings license card now states it plainly: free, every feature included.

### 🤖 Multi-model AI (4.0.4 follow-through)
- AI provider selector in Settings: FileMayor AI (default, no key), Google Gemini, OpenAI, Anthropic Claude, or local Ollama. Keys stored in the system keychain.

### 🖥️ Platforms
- **Intel Mac support** — macOS now ships both x64 and arm64 DMGs (4.0.4 and earlier were Apple Silicon-only).

### 🔧 Engineering
- **CI on every PR** — typecheck, Vite build, 36 core tests, and the 35-step e2e pipeline now gate every pull request and push to main.
- **Version singleton** — the app, CLI, MCP server, and READMEs all derive their version from `package.json`; `scripts/sync-version.js` covers the MCP package so strings can no longer drift.
- **Bundle −53%** — views are lazy-loaded and heavy deps (framer-motion, lucide, i18n) split into cacheable chunks; entry dropped from 518 KB to 244 KB.
- **MCP `--audit`** — `npx -y @filemayor/mcp --audit` prints a machine-readable trust report (transport, egress, tool list with destructive flags, runtime safeguards) without starting a session.

## [4.0.0] — 2026-05-16

### ✨ The Jarvis Release
- **Global ⌘K Command Bar** — A single command surface available from any view. Type what you want ("organize", "undo", "open assistant") and FileMayor does it. Keyboard-first, fuzzy-matched, with recent-action memory.
- **Mission Control Home** — Replaces the marketing-style dashboard with a workspace-centric home: active workspace card with "Change" / "Diagnose" inline, live activity counter, hardened-runtime stats, four-up quick actions.
- **Polished Assistant** — Conversational layout with quick-prompt chips, inline diagnosis & plan cards, "Review changes" + "Apply" right in the bubble, one-tap rollback after any apply. Restores the workspace from localStorage so chats feel continuous.
- **Status Bar** — Persistent bottom strip shows active workspace, license tier, hardened-runtime indicator, version, and the ⌘K hint.
- **Slimmer Sidebar** — Tighter padding, refined active indicator, "AI" / "PRO" badges, and an inline-undo affordance pinned to the bottom.
- **First-run as a conversation** — Onboarding rewritten as "Hello. I'm FileMayor." with four-promise grid (local-first, reversible, Jarvis-style, hardened) and an immediate first scan so users see value in under 30 seconds.

### 🤖 AI Integration Surfaces
- **`@filemayor/mcp` — MCP server** (`mcp/`) — FileMayor speaks Model Context Protocol over stdio. 14 tools exposed: `filemayor_scan`, `filemayor_analyze`, `filemayor_explain`, `filemayor_plan`, `filemayor_apply`, `filemayor_rollback`, `filemayor_organize`, `filemayor_clean`, `filemayor_duplicates`, `filemayor_dedupe`, `filemayor_delete_files`, `filemayor_history`, `filemayor_undo_last`, `filemayor_info`. Drops into Claude Desktop, Cursor, Zed via one JSON snippet. Reuses the same hardened-runtime safeguards as the CLI and desktop app.
- **Claude Code Skill** (`.claude/skills/filemayor/SKILL.md`) — Teaches Claude when to reach for FileMayor (messy Downloads, "tidy this folder", "find duplicates", disk-space questions) and how to drive the Curative Triad safely (always show diagnosis + plan before applying, prefer dry-run, never bypass blocked system dirs).

### 🐛 Bug Fixes
- **Fix SOP crash** — `parseSOP` was called in `electron/main.js` but never imported. Importing now from `cli/core/sop-parser`. The SOP feature was a guaranteed crash on first use.
- **Fix auto-updater silence** — `update:available`, `update:downloaded`, and `download-progress` events were registered in the preload bridge but never forwarded from the main process. The "Restart to update" banner would never appear. Forwarders added in `initAutoUpdater`.
- **Fix `TerminalView` build error** — Removed duplicate `formatSize` definition that prevented strict TS compilation.
- **Fix dark-theme CSS variables** — `--success`, `--danger`, `--warning`, `--border-subtle`, `--bg-main`, `--bg-card`, `--text-tertiary`, and mesh backgrounds existed only in light theme. Now present in both, so toasts and legal/onboarding modals render correctly in dark mode.
- **Fix 3 pre-existing test failures** — `core.test.js` Organizer tests were calling the async `organize()` synchronously, asserting against a Promise (now async + awaited). `test-e2e-pipeline.js` asserted that `validatePath` blocks system dirs, but that's `isDirSafe`'s job and the path was Windows-only on a Linux runner — switched to the correct API with an OS-aware path. Suite now 36/36 + 35/35 green.

### 🔧 Changed
- Version → `4.0.0` across root `package.json`, `cli/package.json`, CLI `VERSION` constant, TerminalView banner, runtime UI.
- Tagline updated: "Your intelligent filesystem clerk."

## [3.6.0] — 2026-04-03

### 🛡️ Hardened Runtime (Chevza Doctrine)
- **Jailer** — Symlink-aware path jailing blocks system-critical directory access.
- **Vault** — OS-native System Keychain integration for secure API key storage.
- **Logic Guardrail** — Prevents destructive AI-generated operations via batch verification.
- **Emergency Halt** — SIGINT/SIGTERM interception persists the Master Journal to disk.
- **Security Architect** — Domain-scatter blocking validates all AI plans before execution.

### 🐛 Bug Fixes (9 total)
- Fixed `CureEngine` constructor mismatch (wrong arg count).
- Fixed CLI `cure` command argument ordering and missing `generatePlan()` call.
- Fixed Electron `main.js` missing 6 module imports.
- Fixed Electron `curative:rollback` variable shadowing bug.
- Fixed `reporter.formatOrganizeReport` crash on empty results (null guards).
- Fixed `isFileSafe` crash when passed null/undefined (type guard).
- Fixed `progressBar` crash on negative values (clamp to 0-100).
- Fixed `MetadataSentry` crash on files missing `path` field.
- Fixed `IntentStrategist.detectArchetype` crash on null folder name.

### 🚀 Added
- **CLI .env auto-loader** — Zero-dependency `.env` parser, no more manual exports.
- **Domain Archetypes** — 6 folder archetypes: Music, Civics/Law, Agri-Tech, Business, Technical, Library.
- **Bug Hunter test suite** — 93-test stress test covering every module edge case.
- **E2E pipeline tests** — 35-test end-to-end verification (Scan → Explain → Cure → Apply → Undo).

### 🔄 Changed
- Removed legacy `Dockerfile` (Snyk vulnerability source, not needed).
- Updated all dependencies to latest compatible versions.
- Resolved all 6 npm audit vulnerabilities (0 remaining).
- Node.js requirement bumped to `>= 20.20.0`.

## [3.0.0] — 2026-03-15

### ✨ The Agentic Revolution
- **Curative Triad** — Introduced the "Explain -> Cure -> Apply" workflow for trust-based AI organization.
- **Agentic Crew** — Specialized agents (Strategist, Sentry, Planner, Architect) for safe, intelligent file management.
- **Folder Health Score** — New diagnostic engine with gamified health scoring (0-100).
- **Dedupe Engine** — High-speed duplicate detection and one-click purging CLI.
- **Curative UI** — Premium AI Assistant interface in Desktop with real-time health gauges.
- **Filesystem Abstraction v3.0** — Safe, transactional, and rollback-ready engine.

## [2.1.0] — 2026-03-09

### 🚀 Added
- **Deep Intelligence Engine** — New `analyze` command for duplicate detection, bloat mapping, and potential space recovery.
- **Desktop UI Parity** — Brought the "Analyze" feature to the Desktop App with a premium data-rich dashboard.
- **Safety Signals** — Standardized "🛡️ Integrity Check: PASSED" signals across CLI and Desktop UI.
- **Security Playbook** — Full adherence to the "AI Vibe Coding Security Playbook" (Zero-network, cryptographic logs, path sanitization).
- **Internationalization** — Full `analyze` section added to all 10 languages (EN, ES, PT, FR, DE, KO, ZH, AR, HI, JA).
- **16:3 Store Header** — High-fidelity 1600x300 assets for app store and launch platforms.

### 🔄 Changed
- **Global Version Sync** — Unified v2.1.0 across root, CLI, Desktop (SettingsView), and Landing Page.
- **Hardened Handlers** — Patched unguarded `fs:findTempFiles` IPC handler. Reinforced all handlers with strict `validatePath` and `isFileSafe` checks.
- **Production Cleanup** — Stripped all `console.error` and `console.warn` calls from Electron main, SOP parser, and React views.
- **i18n Completeness** — Replaced all hardcoded English strings in AnalyzeView, OrganizeView, CleanerView, and SettingsView with `t()` calls.
- **i18n Bug Fix** — Fixed `fileayor-language` → `filemayor-language` localStorage key typo (language preferences now persist).
- **Secret Management** — Moved hardcoded `CHECKSUM_SECRET` to `process.env.FM_CHECKSUM_SECRET`.
- **Service Worker** — Bumped cache from `filemayor-v1` → `filemayor-v2.1`.
- **Project Cleanup** — Deleted stale `landing/` directory, 5 root marketing PNGs, and `CLAUDE_HANDOFF.md.resolved`.
- **Dependency Audit** — Critical security patch for build dependencies (`npm audit fix`).

## [2.0.0] — 2026-02-26

### 🚀 Added
- **CLI Engine** — Full command-line interface with 7 subcommands (`scan`, `organize`, `clean`, `watch`, `init`, `undo`, `info`)
- **Core Engine** — 9 platform-agnostic modules: scanner, organizer, cleaner, watcher, config, reporter, categories, security, barrel index
- **180+ file extensions** mapped across 12 categories (Documents, Images, Audio, Video, Archives, Code, Config, Fonts, Data, Executables, Design, Books)
- **Path traversal protection** and system directory guards
- **Rollback journal** — undo any organization operation
- **YAML config** — `.filemayor.yml` with hierarchical merge and env var expansion
- **Multi-format output** — table, JSON, CSV, minimal (for piping)
- **File watcher daemon** with rules engine and auto-organize
- **Terminal View** — in-app terminal for running CLI operations visually
- **Install script** — one-liner curl install for servers
- **Professional README** with badges, architecture docs, and usage examples
- **Contributing guide** and MIT License

### 🔄 Changed
- **Electron main.js** refactored to use shared core engine (was inline, now modular)
- **package.json** — fixed name typo, added `bin`, `files`, `repository`, `keywords`, `engines`, Linux/Mac build targets
- **App.tsx** — added Terminal tab to navigation

## [1.0.0] — 2026-02-08

### 🚀 Added
- Initial desktop app with Electron + React + Vite
- File scanner and organizer UI
- System cleaner with junk detection
- Life Setup wizard (directory structure creator)
- Settings with theme toggle and language selection
- Auto-updater via electron-updater
- PWA support with service worker
- Internationalization (10 languages)
- Legal consent dialog (EULA, Privacy Policy, Terms, Disclaimer)
- Launch plan and marketing plan documents
