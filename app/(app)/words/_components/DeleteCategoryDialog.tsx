'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Category } from '@/lib/supabase/categories'

interface Props {
  category: Category | null
  categories: Category[]
  open: boolean
  onClose: () => void
  onConfirm: (wordsAction: 'move' | 'delete', transferToId?: string) => Promise<void>
}

const optionBase =
  'flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors'
const optionIdle = 'bg-white/4 border-white/6'
const optionSelected = {
  primary: 'bg-primary/12 border-nav-active/30',
  error: 'bg-error/12 border-error/30',
}

function RadioDot({ selected, tone }: { selected: boolean; tone: 'primary' | 'error' }) {
  return (
    <span
      className={cn(
        'size-4.5 shrink-0 rounded-full',
        selected
          ? cn('border-[5px]', tone === 'error' ? 'border-error' : 'border-nav-active')
          : 'border-2 border-text-muted',
      )}
    />
  )
}

export function DeleteCategoryDialog({ category, categories, open, onClose, onConfirm }: Props) {
  const [action, setAction] = useState<'move' | 'delete'>('move')
  const [transferToId, setTransferToId] = useState('')
  const [isPending, setIsPending] = useState(false)

  const otherCategories = categories.filter((c) => c.id !== category?.id)
  const hasWords = (category?.wordCount ?? 0) > 0
  const canMove = otherCategories.length > 0

  useEffect(() => {
    if (!open) return
    setAction(canMove ? 'move' : 'delete')
    setTransferToId(otherCategories[0]?.id ?? '')
    setIsPending(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function handleConfirm() {
    if (action === 'move' && !transferToId) return
    setIsPending(true)
    try {
      await onConfirm(action, action === 'move' ? transferToId : undefined)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <AlertDialogContent
        size="sm"
        className="flex flex-col gap-5 w-full max-w-sm data-[size=sm]:max-w-sm bg-surface border border-nav-active/18 ring-0 rounded-2xl p-6"
      >
        <div className="flex flex-col items-center gap-1.5 text-center">
          <AlertDialogTitle className="text-lg font-normal text-text-primary">
            Delete &ldquo;{category?.name}&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-md text-text-secondary">
            {hasWords
              ? `This category has ${category?.wordCount} word${category?.wordCount !== 1 ? 's' : ''}.`
              : 'This will permanently remove the category.'}
          </AlertDialogDescription>
        </div>

        {hasWords && (
          <div className="flex flex-col gap-2">
            {canMove && (
              <label className={cn(optionBase, action === 'move' ? optionSelected.primary : optionIdle)}>
                <input
                  type="radio"
                  name="wordsAction"
                  value="move"
                  checked={action === 'move'}
                  onChange={() => setAction('move')}
                  className="sr-only"
                />
                <RadioDot selected={action === 'move'} tone="primary" />
                <span className="text-md text-text-primary shrink-0">Move to</span>
                <div className="ml-auto min-w-0">
                  <Select
                    value={transferToId}
                    onValueChange={(v) => { if (v !== null) setTransferToId(v) }}
                    disabled={action !== 'move'}
                  >
                    <SelectTrigger className="h-7 max-w-37.5 bg-background border-nav-active/25 text-text-primary text-base rounded-lg">
                      <SelectValue>
                        {otherCategories.find((c) => c.id === transferToId)?.name}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {otherCategories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </label>
            )}

            <label className={cn(optionBase, action === 'delete' ? optionSelected.error : optionIdle)}>
              <input
                type="radio"
                name="wordsAction"
                value="delete"
                checked={action === 'delete'}
                onChange={() => setAction('delete')}
                className="sr-only"
              />
              <RadioDot selected={action === 'delete'} tone="error" />
              <span className={cn('text-md', action === 'delete' ? 'text-error' : 'text-text-secondary')}>
                Delete words too
              </span>
            </label>
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <AlertDialogCancel
            onClick={onClose}
            className="flex-1 h-auto py-2.5 rounded-xl bg-white/6 hover:bg-white/10 border border-white/10 text-md font-normal text-text-secondary"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isPending || (action === 'move' && !transferToId)}
            className="flex-1 h-auto py-2.5 rounded-xl bg-error hover:bg-error/90 text-md font-normal text-white disabled:opacity-40"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
