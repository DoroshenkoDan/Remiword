import { createClient } from './client'
import type { WordPair } from '@/types/word'

export type WordStatus = 'new' | 'learning' | 'mastered'

export function getWordStatus(repetitionCount: number, intervalDays: number): WordStatus {
  if (repetitionCount === 0) return 'new'
  if (intervalDays < 21) return 'learning'
  return 'mastered'
}

export interface WordWithCategory {
  id: string
  word: string
  translation: string
  repetition_count: number
  interval_days: number
  next_review_date: string
  created_at: string
  category_id: string | null
  categories: { id: string; name: string; color: string } | null
}

export async function fetchWords(): Promise<WordWithCategory[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('words')
    .select('id, word, translation, repetition_count, interval_days, next_review_date, created_at, category_id, categories(id, name, color)')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  // Supabase types embedded relations as arrays, but category_id is a to-one
  // FK so `categories` is a single object at runtime — cast via unknown.
  return (data ?? []) as unknown as WordWithCategory[]
}

export interface WordStats {
  total: number
  new: number
  learning: number
  mastered: number
}

export async function fetchWordStats(): Promise<WordStats> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { total: 0, new: 0, learning: 0, mastered: 0 }

  const { data, error } = await supabase
    .from('words')
    .select('repetition_count, interval_days')
    .eq('user_id', user.id)
    .is('deleted_at', null)

  if (error) throw new Error(error.message)

  const words = data ?? []
  return {
    total: words.length,
    new: words.filter((w) => w.repetition_count === 0).length,
    learning: words.filter((w) => w.repetition_count > 0 && w.interval_days < 21).length,
    mastered: words.filter((w) => w.interval_days >= 21).length,
  }
}

const INTERVAL_BY_RATING: Record<number, number> = { 0: 1, 1: 3, 2: 7, 3: 14 }

export async function updateWordAfterReview(
  wordId: string,
  rating: 0 | 1 | 2 | 3,
  currentRepetitionCount: number
): Promise<void> {
  const supabase = createClient()
  const intervalDays = INTERVAL_BY_RATING[rating]

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + intervalDays)
  const nextReviewDate = nextReview.toISOString().split('T')[0]

  const { error } = await supabase
    .from('words')
    .update({
      interval_days: intervalDays,
      next_review_date: nextReviewDate,
      repetition_count: currentRepetitionCount + 1,
    })
    .eq('id', wordId)

  if (error) throw new Error(error.message)
}

export async function batchUpdateWordsAfterReview(
  updates: Array<{ id: string; rating: 0 | 1 | 2 | 3; repetitionCount: number }>
): Promise<void> {
  if (updates.length === 0) return
  const supabase = createClient()

  await Promise.all(
    updates.map(({ id, rating, repetitionCount }) => {
      const intervalDays = INTERVAL_BY_RATING[rating]
      const nextReview = new Date()
      nextReview.setDate(nextReview.getDate() + intervalDays)
      return supabase
        .from('words')
        .update({
          interval_days: intervalDays,
          next_review_date: nextReview.toISOString().split('T')[0],
          repetition_count: repetitionCount + 1,
        })
        .eq('id', id)
    })
  )
}

export async function updateWord(
  id: string,
  data: { word: string; translation: string; category_id: string | null }
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('words').update(data).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteWord(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('words')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function saveWords({ pairs, categoryId }: { pairs: WordPair[], categoryId: string }): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const today = new Date().toISOString().split('T')[0]

  const rows = pairs.map(({ word, translation }) => ({
    user_id: user.id,
    category_id: categoryId,
    word,
    translation,
    next_review_date: today,
    interval_days: 1,
  }))

  const { error } = await supabase.from('words').insert(rows)
  if (error) throw new Error(error.message)
}
