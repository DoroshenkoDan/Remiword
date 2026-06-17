'use client'

import type { GrammarTopic, GrammarCategory } from '@/content/types'
import { TopicCard } from '@/components/grammar/TopicCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface GrammarViewProps {
  topics: GrammarTopic[]
}

const CATEGORIES: { key: GrammarCategory; label: string }[] = [
  { key: 'tenses', label: 'Tenses' },
  { key: 'conditionals', label: 'Conditionals' },
  { key: 'modal-verbs', label: 'Modal Verbs' },
]

export function GrammarView({ topics }: GrammarViewProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden h-[calc(100dvh-56px)] md:h-screen pt-14 md:pt-0">

      {/* Header */}
      <div className="hidden md:flex px-4 md:px-8 pt-5 pb-4 border-b border-border">
        <h1 className="text-lg xl:text-xl font-medium text-text-primary leading-tight shrink-0">Grammar</h1>
      </div>

      <Tabs defaultValue="tenses" className="flex flex-col flex-1 overflow-hidden">
        <div className="px-4 md:px-8 pt-5 pb-4">
          <TabsList className="w-full justify-start gap-1.5 overflow-x-auto no-scrollbar bg-transparent p-0 h-auto rounded-none">
            {CATEGORIES.map(({ key, label }) => (
              <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
            ))}
          </TabsList>
        </div>

        {CATEGORIES.map(({ key }) => (
          <TabsContent key={key} value={key} className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full px-4 md:px-8 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
                {topics
                  .filter((t) => t.category === key)
                  .map((topic) => (
                    <TopicCard key={topic.slug} topic={topic} />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

    </div>
  )
}
