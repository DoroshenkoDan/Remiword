'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SessionHeader } from '@/components/quiz/SessionHeader'
import { ChoiceWordCard } from './ChoiceWordCard'
import { ChoiceOptions } from './ChoiceOptions'
import { ChoiceFeedback } from './ChoiceFeedback'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { SessionStatsPanel } from '@/components/quiz/SessionStatsPanel'
import { SessionWordQueue } from '@/components/quiz/SessionWordQueue'
import { SessionMobileCounters } from '@/components/quiz/SessionMobileCounters'
import { SessionComplete } from '@/components/quiz/SessionComplete'
import { type SessionResult } from '@/components/quiz/sessionTypes'
import { useWords } from '@/hooks/useWords'
import { batchUpdateWordsAfterReview } from '@/lib/supabase/words'
import { saveQuizSession } from '@/lib/supabase/quizSessions'
import { updateStreakForToday } from '@/lib/supabase/profile'
import type { WordWithCategory } from '@/lib/supabase/words'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildOptions(correctIndex: number, allWords: WordWithCategory[]) {
  const correct = allWords[correctIndex].translation
  const wrongs = shuffle(
    allWords.filter((_, i) => i !== correctIndex).map((w) => w.translation)
  ).slice(0, 3)
  const options = shuffle([correct, ...wrongs])
  return { options, correctOption: options.indexOf(correct) }
}

type QuestionState = 'answering' | 'answered'

export function ChoiceView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const categoryParam = searchParams.get('category') ?? 'All'
  const countParam = Number(searchParams.get('count') ?? '20')

  const { words, isLoading } = useWords()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [questionState, setQuestionState] = useState<QuestionState>('answering')
  const [results, setResults] = useState<Record<number, SessionResult>>({})
  const [pendingUpdates, setPendingUpdates] = useState<Array<{ id: string; rating: 0 | 1 | 2 | 3; repetitionCount: number }>>([])
  const sessionSaved = useRef(false)

  const sessionWords = useMemo<WordWithCategory[] | null>(() => {
    if (isLoading) return null
    const filtered = categoryParam === 'All' ? words : words.filter((w) => w.category_id === categoryParam)
    return filtered.slice(0, countParam)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, categoryParam, countParam])

  const { options, correctOption } = useMemo(() => {
    if (!sessionWords || sessionWords.length === 0 || currentIndex >= sessionWords.length) {
      return { options: [] as string[], correctOption: 0 }
    }
    return buildOptions(currentIndex, sessionWords)
  }, [currentIndex, sessionWords])

  const total = sessionWords?.length ?? 0
  const isDone = sessionWords !== null && total > 0 && currentIndex >= total
  const current = sessionWords?.[currentIndex]
  const isCorrect = selected === correctOption

  const correct = Object.values(results).filter((r) => r === 'correct').length
  const wrong = Object.values(results).filter((r) => r === 'missed').length
  const skipped = Object.values(results).filter((r) => r === 'skipped').length

  const { mutate: finishSession } = useMutation({
    mutationFn: ({ total, correct }: { total: number; correct: number }) =>
      Promise.all([
        batchUpdateWordsAfterReview(pendingUpdates),
        saveQuizSession('choice', total, correct),
        updateStreakForToday(),
      ]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] })
      queryClient.invalidateQueries({ queryKey: ['quiz_sessions_today'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  useEffect(() => {
    if (isDone && !sessionSaved.current) {
      sessionSaved.current = true
      finishSession({ total, correct })
    }
  }, [isDone, total, correct, finishSession])

  const handleSelect = (i: number) => {
    if (questionState === 'answered' || !sessionWords) return
    const word = sessionWords[currentIndex]
    const isRight = i === correctOption
    setSelected(i)
    setQuestionState('answered')
    setResults((prev) => ({ ...prev, [currentIndex]: isRight ? 'correct' : 'missed' }))
    setPendingUpdates((prev) => [...prev, {
      id: word.id,
      rating: isRight ? 2 : 0,
      repetitionCount: word.repetition_count,
    }])
  }

  const handleNext = useCallback(() => {
    const next = currentIndex + 1
    setCurrentIndex(next)
    setSelected(null)
    setQuestionState('answering')
  }, [currentIndex])

  const handleSkip = useCallback(() => {
    setResults((prev) => ({ ...prev, [currentIndex]: 'skipped' }))
    handleNext()
  }, [currentIndex, handleNext])

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
        title="Multiple Choice"
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

        <div className="flex flex-col flex-1 overflow-y-auto px-4 md:px-16 lg:px-32 py-4 md:py-6 gap-4">
          <span className="hidden md:block text-sm text-text-muted">
            Multiple Choice · {categoryName}
          </span>

          <ChoiceWordCard word={current!.word} category={categoryName} />

          <ChoiceOptions
            options={options}
            selected={selected}
            correctOption={correctOption}
            answered={questionState === 'answered'}
            onSelect={handleSelect}
          />

          {questionState === 'answered' && (
            <ChoiceFeedback
              isCorrect={isCorrect}
              correctAnswer={options[correctOption]}
              isLast={currentIndex + 1 >= total}
              onNext={handleNext}
            />
          )}

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
