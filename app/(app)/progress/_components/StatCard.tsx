interface StatCardProps {
  value: string | number
  label: string
  valueClass?: string
}

export function StatCard({ value, label, valueClass = 'text-text-primary' }: StatCardProps) {
  return (
    <div className="flex flex-col justify-center gap-1 bg-surface border border-border rounded-xl p-3.5 md:p-5">
      <span className={`text-[32px] font-medium leading-none ${valueClass}`}>{value}</span>
      <span className="text-sm text-text-muted mt-1">{label}</span>
    </div>
  )
}
