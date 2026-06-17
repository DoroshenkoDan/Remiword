'use client'

import { Flame } from 'lucide-react'
import { StreakCard } from './StreakCard'
import { WordStatusCard } from './WordStatusCard'
import { ActivityCard } from './ActivityCard'
import { RecentSessionsCard } from './RecentSessionsCard'
import { StatCard } from './StatCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useWordStats } from '@/hooks/useWordStats'
import { useProgressStats } from '@/hooks/useProgressStats'

export function ProgressView() {
  const { data: profile } = useUserProfile()
  const { stats: wordStats } = useWordStats()
  const { data: progressStats } = useProgressStats()

  const streak = profile?.current_streak ?? 0
  const totalWords = wordStats?.total ?? 0
  const mastered = wordStats?.mastered ?? 0
  const learning = wordStats?.learning ?? 0
  const quizAccuracy = progressStats?.quizAccuracy
  const totalSessions = progressStats?.totalSessions ?? 0
  const recentSessions = progressStats?.recentSessions ?? []
  const activityHeatmap = progressStats?.activityHeatmap ?? []

  const STATS = [
    { value: totalWords, label: 'Total words', valueClass: 'text-text-primary' },
    { value: mastered, label: 'Mastered', valueClass: 'text-success' },
    { value: quizAccuracy != null ? `${quizAccuracy}%` : '—', label: 'Quiz accuracy', valueClass: 'text-nav-active' },
    { value: totalSessions, label: 'Total sessions', valueClass: 'text-text-primary' },
  ]

  return (
    <div className="flex flex-col flex-1 h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0">

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-center justify-between px-8 pt-5 pb-4 border-b border-border">
        <h1 className="text-lg xl:text-xl font-medium text-text-primary">Progress</h1>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20">
          <Flame size={13} strokeWidth={1.5} className="text-warning" />
          <span className="text-xs font-medium text-warning">{streak}-day streak</span>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-3 px-4 md:px-8 pt-5 md:pt-3 pb-8 ">

          {/* ── stats (5 cards) ── */}
          <div className="flex flex-col md:flex-row gap-3">
            <StreakCard streak={streak} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
              {STATS.map(({ value, label, valueClass }) => (
                <StatCard key={label} value={value} label={label} valueClass={valueClass} />
              ))}
            </div>
          </div>

          {/* ── Content area ── */}
          <div className="md:grid md:grid-cols-[1fr_0.5fr] md:items-start gap-3">

            {/* Left column */}
            <div className="flex flex-col gap-3">
              <WordStatusCard mastered={mastered} learning={learning} total={totalWords} />
              <ActivityCard activity={activityHeatmap} />

            </div>

            {/* Right column */}
            <div className="flex flex-col gap-3 mt-3 md:mt-0">
              <RecentSessionsCard sessions={recentSessions} />
            </div>

          </div>
        </div>
      </ScrollArea>

    </div>
  )
}
