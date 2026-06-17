import { useQuery } from '@tanstack/react-query'
import { fetchTodaySessionStats } from '@/lib/supabase/quizSessions'

export function useQuizSessions() {
  return useQuery({ queryKey: ['quiz_sessions_today'], queryFn: fetchTodaySessionStats })
}
