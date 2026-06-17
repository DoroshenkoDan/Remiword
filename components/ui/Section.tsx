/**
 * Generic labeled section wrapper used across pages.
 * Renders a small all-caps label above arbitrary children.
 */

interface SectionProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function Section({ label, children, className }: SectionProps) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">{label}</span>
      {children}
    </div>
  )
}
