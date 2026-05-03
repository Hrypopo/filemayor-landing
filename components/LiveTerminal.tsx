import { cn } from '@/lib/utils';

interface LiveTerminalProps {
  className?: string;
}

export function LiveTerminal({ className }: LiveTerminalProps) {
  return (
    <div
      className={cn(
        'term-block overflow-hidden rounded-xl border border-border font-mono text-[13px] leading-relaxed',
        className,
      )}
      role="img"
      aria-label="Sample filemayor explain output: 1,248 files scanned, diagnosis 22 of 100, 3.8 GB recoverable"
    >
      <div className="flex gap-1.5 border-b border-border/40 bg-black/30 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
      </div>
      <div className="space-y-1 p-5 text-text-2">
        <div className="text-ok">$ filemayor explain ~/Downloads</div>
        <div className="pt-1">Scanned 1,248 files (4.2 GB) in 1.4s</div>
        <div className="pt-0.5 text-text-3">
          ────────────────────────────────────────────
        </div>
        <div className="flex justify-between">
          <span className="text-[#60a5fa]">Images</span>
          <span className="text-text-3">482 files · 1.2 GB</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#f472b6]">Videos</span>
          <span className="text-text-3">12 files · 2.1 GB</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#fbbf24]">Documents</span>
          <span className="text-text-3">634 files · 0.8 GB</span>
        </div>
        <div className="pt-0.5 text-text-3">
          ────────────────────────────────────────────
        </div>
        <div className="pt-1 text-warn">
          Diagnosis: 22/100 · 1,242 dupes · 3.8 GB recoverable
        </div>
        <div className="pt-1 text-ok">→ filemayor cure ~/Downloads</div>
      </div>
    </div>
  );
}
