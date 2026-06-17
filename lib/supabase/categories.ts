import { createClient } from './client'

export interface Category {
  id: string
  name: string
  color: string
  wordCount: number
}

export async function fetchCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const [categoriesResult, wordsResult] = await Promise.all([
    supabase
      .from('categories')
      .select('id, name, color')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true }),
    supabase
      .from('words')
      .select('category_id')
      .eq('user_id', user.id)
      .is('deleted_at', null),
  ])

  if (categoriesResult.error) throw new Error(categoriesResult.error.message)
  if (wordsResult.error) throw new Error(wordsResult.error.message)

  const countMap = (wordsResult.data ?? []).reduce<Record<string, number>>((acc, w) => {
    acc[w.category_id] = (acc[w.category_id] || 0) + 1
    return acc
  }, {})

  return (categoriesResult.data ?? []).map((c) => ({
    ...c,
    wordCount: countMap[c.id] ?? 0,
  }))
}

export async function addCategory(name: string): Promise<Category> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('categories')
    .insert({ user_id: user.id, name })
    .select('id, name, color')
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateCategory(id: string, name: string): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('categories')
    .update({ name })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
}

export async function deleteCategory(
  id: string,
  wordsAction: 'move' | 'delete',
  transferToId?: string,
): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  if (wordsAction === 'move' && transferToId) {
    const { error } = await supabase
      .from('words')
      .update({ category_id: transferToId })
      .eq('category_id', id)
      .eq('user_id', user.id)
      .is('deleted_at', null)
    if (error) throw new Error(error.message)
  } else if (wordsAction === 'delete') {
    const { error } = await supabase
      .from('words')
      .update({ deleted_at: new Date().toISOString() })
      .eq('category_id', id)
      .eq('user_id', user.id)
      .is('deleted_at', null)
    if (error) throw new Error(error.message)
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
}
