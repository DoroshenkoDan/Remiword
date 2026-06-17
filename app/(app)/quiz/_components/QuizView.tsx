'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Section } from '@/components/ui/Section'
import { QuizHeader } from './QuizHeader'
import { QuizStats } from './QuizStats'
import { QuizModeSelector } from './QuizModeSelector'
import { QuizSummaryPanel } from './QuizSummaryPanel'
import { QuizWordCountSelector } from './QuizWordCountSelector'
import { QuizMobileFooter } from './QuizMobileFooter'
import { useWords } from '@/hooks/useWords'
import { useCategories } from '@/hooks/useCategories'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useQuizSessions } from '@/hooks/useQuizSessions'
import { QuizCategoryChips } from './QuizCategoryChips'
import type { Mode } from './QuizModeSelector'
import { defaultWordCount } from './QuizWordCountSelector'
import type { WordCount } from './QuizWordCountSelector'
import { toast } from 'sonner'

export function QuizView() {
  const router = useRouter()
  const [categoryId, setCategoryId] = useState('All')
  const [mode, setMode] = useState<Mode>('flashcard')
  const [selectedCount, setSelectedCount] = useState<WordCount | null>(null)

  const { words } = useWords()
  const { categories } = useCategories()
  const { data: profile } = useUserProfile()
  const { data: sessionStats } = useQuizSessions()

  const availableCount = categoryId === 'All'
    ? words.length
    : words.filter((w) => w.category_id === categoryId).length

  const totalSessionsToday = sessionStats?.total ?? 0
  const modeSessionsToday = sessionStats?.byMode[mode] ?? 0
  const lastAccuracy = sessionStats?.lastAccuracy ?? null

  const streak = profile?.current_streak ?? 0
  const categoryName = categoryId === 'All'
    ? 'All words'
    : (categories.find((c) => c.id === categoryId)?.name ?? 'All words')

  const wordCount = selectedCount ?? defaultWordCount(availableCount)

  const handleCategoryChange = (id: string) => {
    setCategoryId(id)
    setSelectedCount(null)
  }

  const quizCount = wordCount === 'All' ? availableCount : wordCount

  const handleStart = () => {
    if (quizCount < 5) {
      toast.error(`Add at least 5 words to start a quiz`)
      return
    }
    const params = new URLSearchParams({
      category: categoryId,
      count: String(quizCount),
    })
    router.push(`/quiz/${mode}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0">

      <QuizHeader />

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex md:flex-row min-h-full">

          <div className="flex flex-col flex-1 px-4 md:px-8 py-5 gap-5">

            <QuizStats sessionsToday={totalSessionsToday} streak={streak} accuracy={lastAccuracy} />

            <Section label="CATEGORY">
              <QuizCategoryChips
                categories={categories}
                active={categoryId}
                totalCount={words.length}
                onChange={handleCategoryChange}
              />
            </Section>
            <Section label="WORDS COUNT">
              <QuizWordCountSelector total={availableCount} value={wordCount} onChange={setSelectedCount} />
            </Section>
            <Section label="MODE">
              <QuizModeSelector value={mode} onChange={setMode} />
            </Section>

            <QuizMobileFooter
              mode={mode}
              category={categoryName}
              quizCount={quizCount}
              onStart={handleStart}
            />

          </div>

          <div className='hidden md:block w-px self-stretch border-r border-border' />

          <QuizSummaryPanel
            category={categoryName}
            mode={mode}
            resolvedCount={quizCount}
            modeSessionsToday={modeSessionsToday}
            onStart={handleStart}
          />

        </div>
      </ScrollArea>
    </div>
  )
}
