/**
 * Server Component — resolves slugs to titles and renders navigation links.
 */

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getTopicBySlug } from '@/content/grammar'

interface RelatedTopicsProps {
  slugs: string[]
}

export function RelatedTopics({ slugs }: RelatedTopicsProps) {
  const topics = slugs
    .map((slug) => getTopicBySlug(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTopicBySlug>>[]

  if (topics.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">RELATED TOPICS</span>
      <div className="flex flex-col">
        {topics.map((topic, i) => (
          <Link
            key={topic.slug}
            href={`/grammar/${topic.category}/${topic.slug}`}
            className={`flex items-center justify-between py-3 text-text-secondary hover:text-text-primary transition-colors ${
              i < topics.length - 1 ? 'border-b border-border-subtle' : ''
            }`}
          >
            <span className="text-base">{topic.title}</span>
            <ChevronRight size={14} strokeWidth={1.5} className="shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  )
}
