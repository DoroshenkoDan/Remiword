const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CELL_CLASS: Record<number, string> = {
  0: 'bg-nav-active/8',
  1: 'bg-primary/20',
  2: 'bg-primary/40',
  3: 'bg-primary/65',
  4: 'bg-primary',
}

interface ActivityCardProps {
  activity: number[][]
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-md font-medium text-text-primary">Activity</span>
        <span className="text-xs text-text-muted">Last 4 weeks</span>
      </div>

      {/* Day labels */}
      <div className="flex flex-col gap-1.5 max-w-[288px]">
        <div className="grid grid-cols-7 gap-1.5">
          {DAYS.map((d, i) => (
            <span key={i} className="text-xs text-text-muted text-center">{d}</span>
          ))}
        </div>

        {/* Heatmap */}
        {activity.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1.5 max-w-[288px]">
            {week.map((level, di) => (
              <div
                key={di}
                className={`aspect-square rounded-sm ${CELL_CLASS[level]}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-text-muted">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={`size-4 rounded-[3px] ${CELL_CLASS[level]}`} />
        ))}
        <span className="text-xs text-text-muted">More</span>
      </div>
    </div>
  )
}
