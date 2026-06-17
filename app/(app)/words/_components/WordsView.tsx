'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WordCard } from './WordCard'
import { CategoryChips } from './CategoryChips'
import { WordsHeader } from './WordsHeader'
import { AddWordsButton } from './AddWordsButton'
import { EditWordDialog } from './EditWordDialog'
import { ManageCategoriesSheet } from './ManageCategoriesSheet'
import { useWords } from '@/hooks/useWords'
import { useCategories } from '@/hooks/useCategories'
import { getWordStatus } from '@/lib/supabase/words'
import { Section } from '@/components/ui/Section'
import type { WordWithCategory } from '@/lib/supabase/words'

const STATUS_DOT: Record<string, string> = {
  new: 'bg-nav-inactive',
  learning: 'bg-warning',
  mastered: 'bg-success',
}

export function WordsView() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedWord, setSelectedWord] = useState<WordWithCategory | null>(null)
  const [manageOpen, setManageOpen] = useState(false)

  const { words, isLoading } = useWords()
  const { categories } = useCategories()

  // If the active category was deleted, fall back to All
  const resolvedCategory =
    activeCategory === 'All' || categories.find((c) => c.id === activeCategory)
      ? activeCategory
      : 'All'

  const wordsWithStatus = words.map((w) => ({
    ...w,
    status: getWordStatus(w.repetition_count, w.interval_days),
  }))

  const filtered = resolvedCategory === 'All'
    ? wordsWithStatus
    : wordsWithStatus.filter((w) => w.category_id === resolvedCategory)

  const statusCounts = {
    new: wordsWithStatus.filter((w) => w.status === 'new').length,
    learning: wordsWithStatus.filter((w) => w.status === 'learning').length,
    mastered: wordsWithStatus.filter((w) => w.status === 'mastered').length,
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0 md:pb-0">

      <WordsHeader totalCount={words.length} />
      <Section label="CATEGORY" className='mb-3 mt-3 px-4 md:px-6'>
        <CategoryChips
          categories={categories}
          active={resolvedCategory}
          onChange={setActiveCategory}
          totalCount={words.length}
          onManageClick={() => setManageOpen(true)}
        />
      </Section>

      <div className="flex items-center gap-4 px-6 mb-4">
        {Object.entries(STATUS_DOT).map(([status, dotClass]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${dotClass}`} />
            <span className="text-sm text-text-muted capitalize">
              {status} ({statusCounts[status as keyof typeof statusCounts]})
            </span>
          </div>
        ))}
      </div>

      <ScrollArea className="flex-1 min-h-0 px-4 md:px-6">

        {isLoading && (
          <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[82px] rounded-[12px] bg-surface animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <section className="mb-6">
            <p className="text-2xs font-semibold text-text-muted tracking-[0.08em] mb-2">
              ALL WORDS — {filtered.length} TOTAL
            </p>
            <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-3">
              {filtered.map((word) => (
                <WordCard
                  key={word.id}
                  word={word.word}
                  translation={word.translation}
                  categoryName={word.categories?.name}
                  categoryColor={word.categories?.color}
                  status={word.status}
                  onClick={() => setSelectedWord(word)}
                />
              ))}
            </div>
          </section>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="text-sm text-text-secondary text-center pt-12">No words yet. Click button &quot;Add Words&quot; to start filling the list</p>
        )}

      </ScrollArea>

      <AddWordsButton onClick={() => router.push('/words/add')} />

      <EditWordDialog
        word={selectedWord}
        open={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        categories={categories}
      />

      <ManageCategoriesSheet open={manageOpen} onOpenChange={setManageOpen} />

    </div>
  )
}
