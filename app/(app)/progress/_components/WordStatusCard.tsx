interface WordStatusCardProps {
  mastered: number
  learning: number
  total: number
}

const ROWS = [
  { key: 'mastered' as const, label: 'Mastered', dot: 'bg-success', bar: 'bg-success', text: 'text-success' },
  { key: 'learning' as const, label: 'Learning', dot: 'bg-warning', bar: 'bg-warning', text: 'text-warning' },
  { key: 'new' as const, label: 'New', dot: 'bg-text-secondary', bar: 'bg-text-secondary', text: 'text-text-secondary' },
]

export function WordStatusCard({ mastered, learning, total }: WordStatusCardProps) {
  const newCount = Math.max(0, total - mastered - learning)

  const counts: Record<'mastered' | 'learning' | 'new', number> = {
    mastered,
    learning,
    new: newCount,
  }

  return (
    <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-5">
      <span className="text-md font-medium text-text-primary">Word status</span>
      <div className="flex flex-col gap-3">
        {ROWS.map(({ key, label, dot, bar, text }) => {
          const count = counts[key]
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full shrink-0 ${dot}`} />
                  <span className="text-base text-text-primary">{label}</span>
                </div>
                <span className={`text-sm font-medium ${text}`}>
                  {count} words ({pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-nav-active/10 overflow-hidden">
                <div
                  className={`h-full rounded-full ${bar} transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
