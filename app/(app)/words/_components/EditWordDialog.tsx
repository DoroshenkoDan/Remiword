'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateWord, deleteWord } from '@/lib/supabase/words'
import { editWordSchema, type EditWordFormValues } from '@/lib/schemas/words'
import type { WordWithCategory } from '@/lib/supabase/words'
import type { Category } from '@/lib/supabase/categories'

interface Props {
  word: WordWithCategory | null
  open: boolean
  onClose: () => void
  categories: Category[]
}

async function runUpdate(id: string, data: EditWordFormValues) {
  await updateWord(id, {
    word: data.word,
    translation: data.translation,
    category_id: data.category_id || null,
  })
}

async function runDelete(id: string) {
  await deleteWord(id)
}

const inputClass = (hasError: boolean) =>
  `w-full bg-background border rounded-lg px-3 py-2 text-sm text-text-primary outline-none transition-colors ${hasError ? 'border-error/60' : 'border-border focus:border-primary/50'
  }`

export function EditWordDialog({ word, open, onClose, categories }: Props) {
  const queryClient = useQueryClient()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<EditWordFormValues>({
    resolver: zodResolver(editWordSchema),
  })

  useEffect(() => {
    if (word) {
      reset({
        word: word.word,
        translation: word.translation,
        category_id: word.category_id ?? null,
      })
      setConfirmDelete(false)
    }
  }, [word, reset])

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['words'] })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  }

  const { mutate: save, isPending: isSaving } = useMutation({
    mutationFn: (data: EditWordFormValues) => runUpdate(word!.id, data),
    onSuccess: () => {
      toast.success('Word updated')
      invalidate()
      onClose()
    },
    onError: () => toast.error('Failed to update word'),
  })

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => runDelete(word!.id),
    onSuccess: () => {
      toast.success('Word deleted')
      invalidate()
      onClose()
    },
    onError: () => toast.error('Failed to delete word'),
  })

  const categoryId = watch('category_id')
  const isPending = isSaving || isDeleting

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="bg-surface border-border text-text-primary gap-5" showCloseButton>
        <DialogHeader>
          <DialogTitle className="text-text-primary">Edit word</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit((d) => save(d))} className="flex flex-col gap-3">

          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Word</label>
            <input {...register('word')} className={inputClass(!!errors.word)} />
            {errors.word && <span className="text-xs text-error">{errors.word.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Translation</label>
            <input {...register('translation')} className={inputClass(!!errors.translation)} />
            {errors.translation && <span className="text-xs text-error">{errors.translation.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-muted">Category</label>
            <Select
              value={categoryId ?? ''}
              onValueChange={(v) => setValue('category_id', v || null)}
            >
              <SelectTrigger className="w-full h-9 bg-background border-border text-text-primary">
                <SelectValue placeholder="No category">
                  {categoryId ? categories.find(c => c.id === categoryId)?.name : undefined}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Sure?</span>
                <button
                  type="button"
                  onClick={() => remove()}
                  disabled={isPending}
                  className="text-xs text-error hover:underline disabled:opacity-50 cursor-pointer"
                >
                  Yes, delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-text-muted hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={isPending}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-error transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Trash2 size={13} strokeWidth={1.5} />
                Delete
              </button>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-primary text-text-primary text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}
