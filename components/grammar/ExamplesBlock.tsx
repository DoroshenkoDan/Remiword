/**
 * Renders a list of grammar examples with colored type indicators.
 * Sentence type is auto-detected from the sentence text.
 */
// TODO: FIX this AI rave,add type to bd
import type { Example } from '@/content/types'

interface ExamplesBlockProps {
  examples: Example[]
}

function detectType(sentence: string): 'positive' | 'negative' | 'question' {
  const s = sentence.trim()
  if (/^(Do|Does|Did|Is|Are|Was|Were|Have|Has|Had|Will|Would|Can|Could)\b/.test(s)) return 'question'
  if (/\b(doesn't|don't|didn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|won't|wouldn't|can't|couldn't)\b/.test(s)) return 'negative'
  return 'positive'
}

const INDICATOR: Record<'positive' | 'negative' | 'question', { icon: string; text: string }> = {
  positive: { icon: 'bg-success', text: 'text-text-primary' },
  negative: { icon: 'bg-error', text: 'text-error' },
  question: { icon: 'bg-nav-active', text: 'text-nav-active' },
}

export function ExamplesBlock({ examples }: ExamplesBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">EXAMPLES</span>
      <div className="flex flex-col gap-3">
        {examples.map((ex, i) => {
          const type = detectType(ex.sentence)
          const style = INDICATOR[type]
          return (
            <div key={i} className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${style.icon}`} />
              <span className={`text-sm ${style.text}`}>{ex.sentence}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
