'use client'

import { Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Category } from '@/lib/supabase/categories'

interface CategoryChipsProps {
  categories: Category[]
  active: string
  onChange: (id: string) => void
  totalCount?: number
  onManageClick?: () => void
}

export function CategoryChips({ categories, active, onChange, totalCount, onManageClick }: CategoryChipsProps) {
  return (
    <div className="flex items-start gap-1">
      <ScrollArea className="flex-1 min-w-0">
        <div className="flex gap-1.5 mb-3">
          <button
            onClick={() => onChange('All')}
            className={cn(
              'shrink-0 px-3.5 py-1.25 rounded-full text-[11px] transition-colors cursor-pointer border-none',
              active === 'All'
                ? 'bg-primary text-text-primary font-medium cursor-default'
                : 'bg-surface text-text-secondary border border-border hover:border-border-strong'
            )}
          >
            {totalCount !== undefined ? `All (${totalCount})` : 'All'}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={cn(
                'shrink-0 px-3.5 py-1.25 rounded-full text-[11px] transition-colors cursor-pointer border-none',
                active === cat.id
                  ? 'bg-primary text-text-primary font-medium cursor-default'
                  : 'bg-surface text-text-secondary border border-border hover:border-border-strong'
              )}
            >
              {cat.name} ({cat.wordCount})
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {onManageClick && (
        <button
          onClick={onManageClick}
          className="shrink-0 p-1 mb-3 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
        >
          <Settings size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
