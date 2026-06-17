'use client'

import { cn } from '@/lib/utils'
import type { Category } from '@/lib/supabase/categories'

interface QuizCategoryChipsProps {
  categories: Category[]
  active: string
  totalCount: number
  onChange: (id: string) => void
}

export function QuizCategoryChips({ categories, active, totalCount, onChange }: QuizCategoryChipsProps) {
  const chipClass = (isActive: boolean) => cn(
    'px-3.5 py-1.25 rounded-full text-xs font-medium transition-colors cursor-pointer border-none',
    isActive
      ? 'bg-primary text-text-primary'
      : 'bg-surface border border-nav-active/20 text-text-secondary hover:border-nav-active/40'
  )

  return (
    <div className="flex flex-wrap gap-1.5">
      <button onClick={() => onChange('All')} className={chipClass(active === 'All')}>
        All words ({totalCount})
      </button>
      {categories.map((cat) => (
        <button key={cat.id} onClick={() => onChange(cat.id)} className={chipClass(active === cat.id)}>
          {cat.name} ({cat.wordCount})
        </button>
      ))}
    </div>
  )
}
