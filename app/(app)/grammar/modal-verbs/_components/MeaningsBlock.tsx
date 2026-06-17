/**
 * Meanings block — pill chips showing what a modal verb can express.
 */

interface MeaningsBlockProps {
  meanings: string[]
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function MeaningsBlock({ meanings }: MeaningsBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">MEANINGS</span>
      <div className="flex flex-wrap gap-2">
        {meanings.map((meaning) => (
          <span
            key={meaning}
            className="px-3.5 py-1.25 rounded-full text-[13px] text-text-secondary bg-nav-active/8 border border-nav-active/20"
          >
            {capitalize(meaning)}
          </span>
        ))}
      </div>
    </div>
  )
}
