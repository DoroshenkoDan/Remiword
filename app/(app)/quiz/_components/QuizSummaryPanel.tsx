'use client'

/**
 * Desktop-only right panel showing a live session summary and start button.
 */
// TODO: Rewrite component
import type { Mode } from './QuizModeSelector'
import { MODES } from './QuizModeSelector'

interface QuizSummaryPanelProps {
  category: string
  mode: Mode
  resolvedCount: number
  modeSessionsToday: number
  onStart: () => void
}

export function QuizSummaryPanel({ category, mode, resolvedCount, modeSessionsToday, onStart }: QuizSummaryPanelProps) {
  const modeLabel = MODES.find((m) => m.id === mode)?.label ?? ''
  const estTime = Math.max(1, Math.ceil(resolvedCount * 0.4))
  const summaryText = `${modeLabel} · ${category} · ${resolvedCount} words`

  return (
    <div className="hidden md:flex flex-col w-[340px] shrink-0 p-6">
      <div className="flex flex-col bg-surface border border-border rounded-xl p-6">
        <span className="text-xl font-semibold text-text-primary mb-5">Session summary</span>

        <div className="flex flex-col gap-3">
          <SummaryRow label="Category" value={category} />
          <SummaryRow label="Mode" value={modeLabel} />
          <SummaryRow label="Sessions today" value={String(modeSessionsToday)} />
          <SummaryRow label="Words in session" value={String(resolvedCount)} />
          <SummaryRow label="Est. time" value={`~${estTime} minutes`} />
        </div>

        <div className="h-px bg-border my-5" />

        <button
          onClick={onStart}
          className="flex items-center justify-center w-full py-3.5 rounded-lg bg-primary text-text-primary text-md font-semibold cursor-pointer border-none hover:opacity-80 transition-opacity mb-3"
        >
          Start session →
        </button>

        <span className="text-xs text-text-muted text-center">{summaryText}</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-base text-text-muted">{label}</span>
      <span className="text-base text-text-primary font-medium">{value}</span>
    </div>
  )
}
