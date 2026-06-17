'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchWordStats } from '@/lib/supabase/words'
import type { WordStats } from '@/lib/supabase/words'

export function useWordStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['word-stats'],
    queryFn: fetchWordStats,
  })

  return { stats, isLoading }
}

export type { WordStats }
