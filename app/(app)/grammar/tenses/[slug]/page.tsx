import { notFound } from 'next/navigation'
import { getTopicBySlug, getTopicsByCategory } from '@/content/grammar'
import type { TensesTopic } from '@/content/types'
import { BreadcrumbHeader } from "@/components/layout/BreadcrumbHeader"
import { GrammarCard } from '@/components/grammar/GrammarCard'
import { TopicTittle } from '@/components/grammar/TopicTittle'
import { ExamplesBlock } from '@/components/grammar/ExamplesBlock'
import { MistakesBlock } from '@/components/grammar/MistakesBlock'
import { UseCasesBlock } from '@/components/grammar/UseCasesBlock'
import { RelatedTopics } from '@/components/grammar/RelatedTopics'
import { TensesFormulaBlock } from '../_components/TensesFormulaBlock'
import { SignalWordsBlock } from '../_components/SignalWordsBlock'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const topics = getTopicsByCategory('tenses')
  return topics.map((t) => ({ slug: t.slug }))
}

export default async function TensesTopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)

  if (!topic || topic.category !== 'tenses') notFound()

  const tensesTopic = topic as TensesTopic

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0  md:pb-0">
      <BreadcrumbHeader backHref="/grammar" backLabel="Grammar" title={tensesTopic.title} />
      <ScrollArea className="flex-1 min-h-0 px-4 md:px-6 ">
        <div className='grid md:grid-cols-[1fr_0.8fr] gap-4 md:gap-6 py-4'>
          <div className="flex flex-col gap-4">
            <GrammarCard>
              <TopicTittle
                title={tensesTopic.title}
                description={tensesTopic.description}
                category={tensesTopic.category}
              />
            </GrammarCard>

            <GrammarCard>
              <TensesFormulaBlock formula={tensesTopic.formula} />
            </GrammarCard>

            <GrammarCard>
              <SignalWordsBlock words={tensesTopic.signalWords} />
            </GrammarCard>

            <GrammarCard>
              <UseCasesBlock useCases={tensesTopic.useCases} />
            </GrammarCard>
          </div>

          <div className="flex flex-col gap-4">
            <GrammarCard>
              <ExamplesBlock examples={tensesTopic.examples} />
            </GrammarCard>

            <GrammarCard>
              <MistakesBlock mistakes={tensesTopic.mistakes} />
            </GrammarCard>

            {tensesTopic.relatedTopics.length > 0 && (
              <GrammarCard>
                <RelatedTopics slugs={tensesTopic.relatedTopics} />
              </GrammarCard>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
