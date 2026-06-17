import { notFound } from 'next/navigation'
import { getTopicBySlug, getTopicsByCategory } from '@/content/grammar'
import type { ConditionalsTopic } from '@/content/types'

import { BreadcrumbHeader } from '@/components/layout/BreadcrumbHeader'
import { GrammarCard }              from '@/components/grammar/GrammarCard'
import { TopicTittle }              from '@/components/grammar/TopicTittle'
import { ExamplesBlock }            from '@/components/grammar/ExamplesBlock'
import { MistakesBlock }            from '@/components/grammar/MistakesBlock'
import { UseCasesBlock }            from '@/components/grammar/UseCasesBlock'
import { RelatedTopics }            from '@/components/grammar/RelatedTopics'
import { ConditionalsFormulaBlock } from '../_components/ConditionalsFormulaBlock'
import { ScrollArea }               from '@/components/ui/scroll-area'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const topics = getTopicsByCategory('conditionals')
  return topics.map((t) => ({ slug: t.slug }))
}

export default async function ConditionalsTopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)

  if (!topic || topic.category !== 'conditionals') notFound()

  const t = topic as ConditionalsTopic

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0">
      <BreadcrumbHeader backHref="/grammar" backLabel="Grammar" title={t.title} />
      <ScrollArea className="flex-1 min-h-0 px-4 md:px-6">
        <div className="grid md:grid-cols-[1fr_0.8fr] gap-4 md:gap-6 py-4">

          {/* Left column */}
          <div className="flex flex-col gap-4">
            <GrammarCard>
              <TopicTittle
                title={t.title}
                description={t.description}
                category={t.category}
              />
            </GrammarCard>

            <GrammarCard>
              <ConditionalsFormulaBlock formula={t.formula} realOrUnreal={t.realOrUnreal} />
            </GrammarCard>

            <GrammarCard>
              <ExamplesBlock examples={t.examples} />
            </GrammarCard>

            <GrammarCard>
              <MistakesBlock mistakes={t.mistakes} />
            </GrammarCard>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <GrammarCard>
              <UseCasesBlock useCases={t.useCases} />
            </GrammarCard>

            {t.relatedTopics.length > 0 && (
              <GrammarCard>
                <RelatedTopics slugs={t.relatedTopics} />
              </GrammarCard>
            )}
          </div>

        </div>
      </ScrollArea>
    </div>
  )
}
