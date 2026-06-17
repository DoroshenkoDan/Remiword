'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SessionCard } from './SessionCard'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { SessionHeader } from '@/components/quiz/SessionHeader'
import { SessionStatsPanel } from '@/components/quiz/SessionStatsPanel'
import { SessionWordQueue } from '@/components/quiz/SessionWordQueue'
import { SessionMobileCounters } from '@/components/quiz/SessionMobileCounters'
import { SessionComplete } from '@/components/quiz/SessionComplete'
import { RATING_TO_RESULT, type SessionResult } from '@/components/quiz/sessionTypes'
import { useWords } from '@/hooks/useWords'
import { batchUpdateWordsAfterReview } from '@/lib/supabase/words'
import { saveQuizSession } from '@/lib/supabase/quizSessions'
import { updateStreakForToday } from '@/lib/supabase/profile'

import type { WordWithCategory } from '@/lib/supabase/words'
import type { Rating } from './SessionCard'

export function FlashcardView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const categoryParam = searchParams.get('category') ?? 'All'
  const countParam = Number(searchParams.get('count') ?? '20')

  const { words, isLoading } = useWords()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<Record<number, SessionResult>>({})
  const [pendingUpdates, setPendingUpdates] = useState<Array<{ id: string; rating: Rating; repetitionCount: number }>>([])
  const sessionSaved = useRef(false)

  const sessionWords = useMemo<WordWithCategory[] | null>(() => {
    if (isLoading) return null
    const filtered = categoryParam === 'All' ? words : words.filter((w) => w.category_id === categoryParam)
    return filtered.slice(0, countParam)
    // Intentionally omit words from deps — freeze the list on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, categoryParam, countParam])

  const total = sessionWords?.length ?? 0
  const isDone = sessionWords !== null && total > 0 && currentIndex >= total
  const current = sessionWords?.[currentIndex]

  const correct = Object.values(results).filter((r) => r === 'correct' || r === 'good').length
  const wrong = Object.values(results).filter((r) => r === 'missed').length
  const skipped = Object.values(results).filter((r) => r === 'skipped').length

  const { mutate: finishSession } = useMutation({
    mutationFn: ({ total, correct }: { total: number; correct: number }) =>
      Promise.all([
        batchUpdateWordsAfterReview(pendingUpdates),
        saveQuizSession('flashcard', total, correct),
        updateStreakForToday(),
      ]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] })
      queryClient.invalidateQueries({ queryKey: ['quiz_sessions_today'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const handleRate = useCallback((rating: Rating) => {
    if (!sessionWords) return
    const word = sessionWords[currentIndex]
    setResults((prev) => ({ ...prev, [currentIndex]: RATING_TO_RESULT[rating] }))
    setPendingUpdates((prev) => [...prev, { id: word.id, rating, repetitionCount: word.repetition_count }])
    setCurrentIndex((i) => i + 1)
  }, [currentIndex, sessionWords])

  const handleSkip = useCallback(() => {
    setResults((prev) => ({ ...prev, [currentIndex]: 'skipped' }))
    setCurrentIndex((i) => i + 1)
  }, [currentIndex])

  useEffect(() => {
    if (isDone && !sessionSaved.current) {
      sessionSaved.current = true
      finishSession({ total, correct })
    }
  }, [isDone, total, correct, finishSession])

  if (isLoading || sessionWords === null) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-56px)] md:h-screen">
        <span className="text-text-muted text-sm">Loading session…</span>
      </div>
    )
  }

  if (isDone) {
    return (
      <SessionComplete
        correct={correct}
        wrong={wrong}
        skipped={skipped}
        onBack={() => router.push('/quiz')}
      />
    )
  }

  const categoryName = categoryParam === 'All'
    ? 'All words'
    : (current?.categories?.name ?? 'Unknown')

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0 pb-15 md:pb-0">

      <SessionHeader
        title="Flashcard session"
        currentIndex={currentIndex}
        total={total}
        onExit={() => router.back()}
        onSkip={handleSkip}
      />

      <ProgressBar current={currentIndex} total={total} />

      <div className="flex flex-1 overflow-hidden">

        <SessionStatsPanel
          correct={correct}
          wrong={wrong}
          skipped={skipped}
          remaining={total - currentIndex}
          currentIndex={currentIndex}
        />

        <div className="flex flex-col flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 gap-4">
          <span className="hidden md:block text-sm text-text-muted">
            Flashcard · {categoryName}
          </span>

          <SessionCard
            key={currentIndex}
            word={current!.word}
            translation={current!.translation}
            onRate={handleRate}
          />

          <SessionMobileCounters correct={correct} wrong={wrong} skipped={skipped} />
        </div>
        <SessionWordQueue
          words={sessionWords}
          currentIndex={currentIndex}
          results={results}
        />

      </div>
    </div>
  )
}
