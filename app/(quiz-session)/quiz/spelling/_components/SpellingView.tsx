'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SessionHeader } from '@/components/quiz/SessionHeader'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { SessionStatsPanel } from '@/components/quiz/SessionStatsPanel'
import { SessionWordQueue } from '@/components/quiz/SessionWordQueue'
import { SessionMobileCounters } from '@/components/quiz/SessionMobileCounters'
import { SessionComplete } from '@/components/quiz/SessionComplete'
import { type SessionResult } from '@/components/quiz/sessionTypes'
import { SpellingWordCard } from './SpellingWordCard'
import { SpellingInput } from './SpellingInput'
import { SpellingFeedback } from './SpellingFeedback'
import { SpellingActions } from './SpellingActions'
import { useWords } from '@/hooks/useWords'
import { batchUpdateWordsAfterReview } from '@/lib/supabase/words'
import { saveQuizSession } from '@/lib/supabase/quizSessions'
import { updateStreakForToday } from '@/lib/supabase/profile'
import type { WordWithCategory } from '@/lib/supabase/words'

type GameStatus = 'guessing' | 'correct' | 'failed'

const MAX_ATTEMPTS = 2

export function SpellingView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const categoryParam = searchParams.get('category') ?? 'All'
  const countParam = Number(searchParams.get('count') ?? '20')

  const { words, isLoading } = useWords()
  const inputRef = useRef<HTMLInputElement>(null)
  const sessionSaved = useRef(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [attempts, setAttempts] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>('guessing')
  const [results, setResults] = useState<Record<number, SessionResult>>({})
  const [pendingUpdates, setPendingUpdates] = useState<Array<{ id: string; rating: 0 | 1 | 2; repetitionCount: number }>>([])

  const sessionWords = useMemo<WordWithCategory[] | null>(() => {
    if (isLoading) return null
    const filtered = categoryParam === 'All' ? words : words.filter((w) => w.category_id === categoryParam)
    return filtered.slice(0, countParam)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, categoryParam, countParam])

  const total = sessionWords?.length ?? 0
  const isDone = sessionWords !== null && total > 0 && currentIndex >= total
  const current = sessionWords?.[currentIndex]

  const correctCount = Object.values(results).filter((r) => r === 'correct').length
  const wrongCount = Object.values(results).filter((r) => r === 'missed').length
  const skippedCount = Object.values(results).filter((r) => r === 'skipped').length

  const { mutate: finishSession } = useMutation({
    mutationFn: ({ total, correct }: { total: number; correct: number }) =>
      Promise.all([
        batchUpdateWordsAfterReview(pendingUpdates),
        saveQuizSession('spelling', total, correct),
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
      finishSession({ total, correct: correctCount })
    }
  }, [isDone, total, correctCount, finishSession])

  useEffect(() => {
    if (!isDone && gameStatus === 'guessing') inputRef.current?.focus()
  }, [currentIndex, isDone, gameStatus])

  const handleSubmit = () => {
    if (gameStatus !== 'guessing' || !currentGuess.trim() || !current) return

    const guess = currentGuess.trim()
    const newAttempts = [...attempts, guess]
    setAttempts(newAttempts)
    setCurrentGuess('')

    const isCorrect = guess.toLowerCase() === current.word.toLowerCase()

    if (isCorrect) {
      const rating: 0 | 1 | 2 = attempts.length === 0 ? 2 : 1
      setGameStatus('correct')
      setResults((prev) => ({ ...prev, [currentIndex]: 'correct' }))
      setPendingUpdates((prev) => [...prev, { id: current.id, rating, repetitionCount: current.repetition_count }])
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      setGameStatus('failed')
      setResults((prev) => ({ ...prev, [currentIndex]: 'missed' }))
      setPendingUpdates((prev) => [...prev, { id: current.id, rating: 0, repetitionCount: current.repetition_count }])
    }
  }

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => i + 1)
    setCurrentGuess('')
    setAttempts([])
    setGameStatus('guessing')
  }, [])

  const handleSkip = useCallback(() => {
    setResults((prev) => ({ ...prev, [currentIndex]: 'skipped' }))
    setCurrentIndex((i) => i + 1)
    setCurrentGuess('')
    setAttempts([])
    setGameStatus('guessing')
  }, [currentIndex])

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
        correct={correctCount}
        wrong={wrongCount}
        skipped={skippedCount}
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
        title="Spelling"
        currentIndex={currentIndex}
        total={total}
        onExit={() => router.back()}
        onSkip={handleSkip}
      />

      <ProgressBar current={currentIndex} total={total} />

      <div className="flex flex-1 overflow-hidden">

        <SessionStatsPanel
          correct={correctCount}
          wrong={wrongCount}
          skipped={skippedCount}
          remaining={total - currentIndex}
          currentIndex={currentIndex}
        />

        <div className="flex flex-col flex-1 overflow-y-auto px-4 md:px-16 lg:px-28 py-4 md:py-6 gap-4">

          <span className="hidden md:block text-sm text-text-muted">
            Spelling · {categoryName}
          </span>

          <SpellingWordCard
            word={current!.word}
            translation={current!.translation}
            currentGuess={currentGuess}
            attempts={attempts}
          />

          <SpellingInput
            inputRef={inputRef}
            value={currentGuess}
            isActive={gameStatus === 'guessing'}
            onChange={setCurrentGuess}
            onSubmit={handleSubmit}
            onNext={handleNext}
          />

          <SpellingFeedback
            gameStatus={gameStatus}
            correctWord={current!.word}
            attemptsLeft={MAX_ATTEMPTS - attempts.length}
            isLast={currentIndex + 1 >= total}
            onNext={handleNext}
          />

          <SpellingActions
            isActive={gameStatus === 'guessing'}
            canSubmit={!!currentGuess.trim()}
            onSubmit={handleSubmit}
          />

          <SessionMobileCounters correct={correctCount} wrong={wrongCount} skipped={skippedCount} />

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
