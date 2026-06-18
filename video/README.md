# FileMayor — 3D Product Launch Video

The 60-second cinematic launch video from `VIDEO_SCRIPT.md`, built as code:
[Remotion](https://remotion.dev) + React Three Fiber. Every scene is real,
deterministic 3D — no AI generation, no stock footage — using the exact site
brand: `#0d0b0a` background, `#d4af37` amber accent, Newsreader + Geist Mono.

## Scenes (Master60, 1920×1080 @ 30fps)

| # | Scene | Time | What happens |
|---|-------|------|--------------|
| 1 | The Problem | 0:00–0:10 | Chaotic field of messy file cards drifting in a dark void; camera pulls back |
| 2 | The Scan | 0:10–0:20 | Golden beam sweeps the field; duplicates pulse red, stale files orange; health score 34/100 counts up |
| 3 | The Plan | 0:20–0:30 | Operation cards (MOVE / RENAME / ARCHIVE with paths + reasons) materialize; camera pushes through the grid |
| 4 | The Execution | 0:30–0:42 | Files fly into tidy labeled stacks with golden landing pulses; sweeping camera |
| 5 | The Undo | 0:42–0:50 | `filemayor undo --all` — everything flows back in reverse with amber trails |
| 6 | Logo Reveal | 0:50–1:00 | FileMayor logotype, breathing amber glow, `npm install -g filemayor` |

## Render

```bash
cd video
npm install
npm run render        # 60s master  → out/filemayor-launch-60s.mp4
npm run render:15s    # 15s cut (scenes 1+4+6) for social
npm run render:6s     # 6s cut (scene 4) for paid ads
npm run studio        # live-edit in Remotion Studio
```

> **Windows / PowerShell:** run each line separately. Windows PowerShell 5.1
> rejects `&&` between commands (`The token '&&' is not a valid statement
> separator`) — use `;`, or PowerShell 7+/cmd.exe. Also make sure you're inside
> the cloned repo first: `cd filemayor-landing\video`, not just `cd video`.

### True 4K (3840×2160)

The compositions are 1920×1080, but the scenes are real 3D, so they
re-render crisp at any resolution. `--scale 2` renders the canvas at 2× for a
native 4K master (not an upscale):

```bash
npm run render:4k      # 60s master → out/filemayor-launch-60s-4k.mp4
npm run render:15s:4k  # 15s cut    → out/filemayor-launch-15s-4k.mp4
npm run render:6s:4k   # 6s cut     → out/filemayor-launch-6s-4k.mp4
```

The `--timeout 240000` is required: at 4K the heaviest frames exceed Remotion's
default 30s per-frame `delayRender` timeout and the render aborts without it.
`--concurrency 3` keeps memory in check on a 16 GB box. Expect roughly real-time
× 30 to render (the 60s master ≈ 2h on a CPU-only machine; far faster with a GPU).
Masters are large (60s ≈ 700 MB); transcode a smaller delivery copy with
`npx remotion ffmpeg -i <master> -crf 28 -movflags +faststart out/preview.mp4`.

Square (1:1) crops for Instagram/X can be rendered from any composition with
`--width 1080 --height 1080` after adjusting the composition size in
`src/Root.tsx`.

Headless environments without a GPU are supported (the config pins the
`swangle` software WebGL renderer). To add a soundtrack, drop a 60s track at
`public/music.mp3` and wrap the composition in `<Audio src={staticFile('music.mp3')} />`,
or mux it post-render:

```bash
npx remotion ffmpeg -i out/filemayor-launch-60s.mp4 -i music.mp3 -c:v copy -c:a aac -shortest out/final.mp4
```
