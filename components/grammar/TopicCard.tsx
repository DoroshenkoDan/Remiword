/**
 * Card for a grammar topic on the category listing page.
 */

import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'
import type { GrammarTopic } from '@/content/types'

interface TopicCardProps {
  topic: GrammarTopic
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`/grammar/${topic.category}/${topic.slug}`}
      className="flex items-center justify-between bg-surface border border-nav-active/20 rounded-xl px-4.25 py-3.75 hover:border-nav-active/40 transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center size-8 rounded-lg bg-primary/12 shrink-0">
          <FileText size={16} strokeWidth={1.5} className="text-warning" />
        </div>

        <div className="flex flex-col">
          <span className="text-base font-medium text-text-primary leading-[19.5px]">{topic.title}</span>
          <span className="text-xs text-text-secondary leading-[16.5px]">{topic.description}</span>
        </div>
      </div>

      <ChevronRight size={16} strokeWidth={1.5} className="shrink-0 text-text-muted" />
    </Link>
  )
}
