import { createClient } from './client'

export interface UserProfile {
  id: string
  name: string
  current_streak: number
  last_activity_date: string | null
}

export async function fetchUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('id, name, current_streak, last_activity_date')
    .eq('id', user.id)
    .single()

  if (error) return null
  return data
}

export async function updateStreakForToday(): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('current_streak, last_activity_date')
    .eq('id', user.id)
    .single()

  if (!profile) return

  const today = new Date().toISOString().split('T')[0]
  if (profile.last_activity_date === today) return

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  const newStreak = profile.last_activity_date === yesterdayStr
    ? profile.current_streak + 1
    : 1

  await supabase
    .from('user_profiles')
    .update({ current_streak: newStreak, last_activity_date: today })
    .eq('id', user.id)
}
