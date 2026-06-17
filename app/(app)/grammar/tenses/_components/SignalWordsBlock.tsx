/**
 * Signal words block — renders keyword chips for a tense.
 */

interface SignalWordsBlockProps {
  words: string[]
}

export function SignalWordsBlock({ words }: SignalWordsBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">SIGNAL WORDS</span>
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <span
            key={word}
            className="px-3.5 py-1.25 border border-border rounded-full bg-nav-active/10 text-text-secondary text-xs font-medium"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
