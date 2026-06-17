'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchProgressStats } from '@/lib/supabase/quizSessions'

export function useProgressStats() {
  return useQuery({
    queryKey: ['progress-stats'],
    queryFn: fetchProgressStats,
  })
}
