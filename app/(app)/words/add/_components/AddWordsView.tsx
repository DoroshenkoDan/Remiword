'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { AddWordsHeader } from './AddWordsHeader'
import { BulkPaste } from './BulkPaste'
import { CategorySelector } from './CategorySelector'
import { PreviewTable } from './PreviewTable'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { WordPair } from '@/types/word'
import { parsePairs } from '@/lib/parsers/wordParser'
import { useCategories } from '@/hooks/useCategories'
import { useWords } from '@/hooks/useWords'

export function AddWordsView() {
  const router = useRouter()
  const { categories, isLoading, createCategory } = useCategories()
  const { saveWords, isSaving } = useWords()

  const [bulkText, setBulkText] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [overridePairs, setOverridePairs] = useState<WordPair[]>([])

  const detectedPairs = useMemo(() => parsePairs(bulkText), [bulkText])
  const displayPairs = overridePairs.length > 0 ? overridePairs : detectedPairs
  const effectiveName = selectedName || categories[0]?.name || ''
  const selectedCategory = categories.find((c) => c.name === effectiveName)

  const handleSaveAll = () => {
    if (!selectedCategory) {
      toast.error('Please select a category')
      return
    }
    saveWords(
      { pairs: displayPairs, categoryId: selectedCategory.id },
      {
        onSuccess: () => {
          toast.success(`${displayPairs.length} words saved!`)
          router.push('/words')
          router.refresh()
        },
        onError: (err) => toast.error(err.message),
      }
    )
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)] md:h-screen overflow-hidden pt-14 md:pt-0 pb-15 md:pb-0">

      <AddWordsHeader pairCount={displayPairs.length} onSave={handleSaveAll} isSaving={isSaving} />

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col md:flex-row min-h-full gap-3">

          <div className="flex flex-col gap-3 flex-1 px-4 md:px-6 py-4 md:sticky md:top-0 md:self-start md:pr-6 md:border-border">
            <div className="flex items-start gap-2 px-3 py-2 rounded-[8px] bg-primary/8 border border-primary/20">
              <Info size={14} strokeWidth={1.5} className="text-nav-active shrink-0 mt-0.5" />
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Paste words in any format. Supported separators: dash (-), colon (:), equals (=), pipe (|)
              </p>
            </div>

            <BulkPaste
              bulkText={bulkText}
              onBulkTextChange={(text) => { setBulkText(text); setOverridePairs([]) }}
              detectedCount={detectedPairs.length}
            />

            <CategorySelector
              value={effectiveName}
              categories={isLoading ? [] : categories.map((c) => c.name)}
              onChange={(name) => { if (name) setSelectedName(name) }}
              onAddCategory={async (name) => {
                try {
                  const newCat = await createCategory(name)
                  setSelectedName(newCat.name)
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : 'Failed to create category')
                }
              }}
            />
          </div>

          <div className='hidden md:block w-px self-stretch border-r border-border' />
          <div className="md:w-100 md:shrink-0 px-4 md:px-6 py-4">
            <PreviewTable pairs={displayPairs} category={effectiveName} />
          </div>

        </div>
      </ScrollArea>
    </div>
  )
}
