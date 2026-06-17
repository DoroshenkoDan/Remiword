import { createClient } from './client'

export interface ProgressSession {
  mode: 'flashcard' | 'choice' | 'spelling'
  accuracy: number
  date: string
  wordCount: number
}

export interface ProgressStats {
  totalSessions: number
  quizAccuracy: number | null
  recentSessions: ProgressSession[]
  activityHeatmap: number[][]
}

export async function fetchProgressStats(): Promise<ProgressStats> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { totalSessions: 0, quizAccuracy: null, recentSessions: [], activityHeatmap: buildActivityHeatmap([]) }

  const { data } = await supabase
    .from('quiz_sessions')
    .select('mode, total_words, correct_words, completed_at')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })

  const sessions = data ?? []

  const totalWords = sessions.reduce((sum, s) => sum + (s.total_words ?? 0), 0)
  const correctWords = sessions.reduce((sum, s) => sum + (s.correct_words ?? 0), 0)
  const quizAccuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : null

  const now = new Date()
  const recentSessions: ProgressSession[] = sessions.slice(0, 7).map((s) => ({
    mode: s.mode as 'flashcard' | 'choice' | 'spelling',
    accuracy: s.total_words > 0 ? Math.round((s.correct_words / s.total_words) * 100) : 0,
    date: formatRelativeDate(new Date(s.completed_at), now),
    wordCount: s.total_words,
  }))

  const completedAts = sessions.map((s) => s.completed_at).filter(Boolean) as string[]

  return {
    totalSessions: sessions.length,
    quizAccuracy,
    recentSessions,
    activityHeatmap: buildActivityHeatmap(completedAts),
  }
}

function formatRelativeDate(date: Date, now: Date): string {
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays} days ago`
}

function buildActivityHeatmap(completedAts: string[]): number[][] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dayOfWeek = today.getDay()
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - daysFromMonday - 21)

  const counts: Record<string, number> = {}
  for (const at of completedAts) {
    const d = new Date(at)
    d.setHours(0, 0, 0, 0)
    const key = d.toISOString().split('T')[0]
    counts[key] = (counts[key] ?? 0) + 1
  }

  const grid: number[][] = []
  const cur = new Date(startDate)
  for (let w = 0; w < 4; w++) {
    const row: number[] = []
    for (let d = 0; d < 7; d++) {
      const key = cur.toISOString().split('T')[0]
      row.push(Math.min(counts[key] ?? 0, 4))
      cur.setDate(cur.getDate() + 1)
    }
    grid.push(row)
  }
  return grid
}

export interface TodaySessionStats {
  total: number
  byMode: Record<string, number>
  lastAccuracy: number | null
}

export async function fetchTodaySessionStats(): Promise<TodaySessionStats> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { total: 0, byMode: {}, lastAccuracy: null }

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const { data } = await supabase
    .from('quiz_sessions')
    .select('mode, total_words, correct_words')
    .eq('user_id', user.id)
    .gte('completed_at', todayStart.toISOString())
    .order('completed_at', { ascending: false })

  const byMode: Record<string, number> = {}
  for (const session of data ?? []) {
    byMode[session.mode] = (byMode[session.mode] ?? 0) + 1
  }

  const { data: lastSession } = await supabase
    .from('quiz_sessions')
    .select('total_words, correct_words')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })
    .limit(1)
    .single()

  const lastAccuracy = lastSession && lastSession.total_words > 0
    ? Math.round((lastSession.correct_words / lastSession.total_words) * 100)
    : null

  return { total: data?.length ?? 0, byMode, lastAccuracy }
}

export async function saveQuizSession(
  mode: string,
  totalWords: number,
  correctWords: number
): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase.from('quiz_sessions').insert({
    user_id: user.id,
    mode,
    total_words: totalWords,
    correct_words: correctWords,
  })

  if (error) throw new Error(error.message)
}
