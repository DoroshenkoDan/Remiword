/**
 * Surface card wrapper used around each grammar block.
 */

interface GrammarCardProps {
  children: React.ReactNode
  className?: string
}

export function GrammarCard({ children, className }: GrammarCardProps) {
  return (
    <div className={`bg-surface border border-border rounded-xl p-5 md:p-6 ${className ?? ''}`}>
      {children}
    </div>
  )
}
