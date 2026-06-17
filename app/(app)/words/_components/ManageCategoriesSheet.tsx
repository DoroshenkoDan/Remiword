'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Check, X, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCategories } from '@/hooks/useCategories'
import { categoryNameWithDupeCheck } from '@/lib/schemas/category'
import type { Category } from '@/lib/supabase/categories'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManageCategoriesSheet({ open, onOpenChange }: Props) {
  const { categories, createCategory, isAdding, renameCategory, removeCategory } = useCategories()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editError, setEditError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [adding, setAdding] = useState(false)
  const [addName, setAddName] = useState('')
  const [addError, setAddError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

  useEffect(() => {
    if (!open) {
      setEditingId(null)
      setEditName('')
      setEditError('')
      setAdding(false)
      setAddName('')
      setAddError('')
    }
  }, [open])

  function startAdd() {
    cancelEdit()
    setAdding(true)
    setAddName('')
    setAddError('')
  }

  function cancelAdd() {
    setAdding(false)
    setAddName('')
    setAddError('')
  }

  async function handleAdd() {
    const names = categories.map((c) => c.name)
    const result = categoryNameWithDupeCheck(names).safeParse(addName)

    if (!result.success) {
      setAddError(result.error.issues[0]?.message ?? 'Invalid value')
      return
    }

    try {
      await createCategory(result.data)
      toast.success('Category added')
      cancelAdd()
    } catch {
      toast.error('Failed to add category')
    }
  }

  function startEdit(cat: Category) {
    cancelAdd()
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditError('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditName('')
    setEditError('')
  }

  async function handleSave(id: string) {
    const current = categories.find((c) => c.id === id)
    if (!current) return

    if (editName.trim() === current.name) {
      cancelEdit()
      return
    }

    const otherNames = categories.filter((c) => c.id !== id).map((c) => c.name)
    const result = categoryNameWithDupeCheck(otherNames).safeParse(editName)

    if (!result.success) {
      setEditError(result.error.issues[0]?.message ?? 'Invalid value')
      return
    }

    setIsSaving(true)
    try {
      await renameCategory({ id, name: result.data })
      toast.success('Category renamed')
      cancelEdit()
    } catch {
      toast.error('Failed to rename category')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(wordsAction: 'move' | 'delete', transferToId?: string) {
    if (!deleteTarget) return
    try {
      await removeCategory({ id: deleteTarget.id, wordsAction, transferToId })
      toast.success('Category deleted')
      setDeleteTarget(null)
    } catch {
      toast.error('Failed to delete category')
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={(o) => onOpenChange(o)}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="bg-surface border-nav-active/15 text-text-primary rounded-t-2xl gap-0 p-0 max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-6 pt-4 pb-4.25 border-b border-nav-active/12">
            <SheetTitle className="text-[17px] font-normal text-text-primary">
              Manage categories
            </SheetTitle>

            <div className="flex items-center gap-2">
              <button
                onClick={startAdd}
                disabled={isAdding}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg px-3 py-1.5 text-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                <Plus size={16} strokeWidth={1.5} />
                Add category
              </button>
              <SheetClose
                render={
                  <button className="flex items-center justify-center size-8 rounded-lg text-text-secondary hover:bg-white/6 transition-colors cursor-pointer" />
                }
              >
                <X size={16} strokeWidth={1.5} />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
          </div>

          {/* List */}
          {categories.length === 0 && !adding ? (
            <p className="text-sm text-text-muted text-center py-10">No categories yet</p>
          ) : (
            <ScrollArea viewportClassName="max-h-[60vh]">
              {adding && (
                <div className="flex items-center gap-3 px-6 py-3 border-b border-nav-active/8">
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <input
                      value={addName}
                      onChange={(e) => { setAddName(e.target.value); setAddError('') }}
                      autoFocus
                      disabled={isAdding}
                      placeholder="Category name"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAdd()
                        if (e.key === 'Escape') cancelAdd()
                      }}
                      className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-base text-text-primary outline-none focus:border-primary/50 w-full disabled:opacity-50"
                    />
                    {addError && <span className="text-xs text-error">{addError}</span>}
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      onClick={handleAdd}
                      disabled={isAdding}
                      className="flex items-center justify-center size-7 rounded-md text-success hover:bg-nav-active/10 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Check size={16} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={cancelAdd}
                      disabled={isAdding}
                      className="flex items-center justify-center size-7 rounded-md text-text-muted hover:bg-nav-active/10 hover:text-text-secondary transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )}

              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group flex items-center justify-between gap-3 px-6 py-3 border-b border-nav-active/8 last:border-0 hover:bg-nav-active/6 transition-colors"
                >
                  {editingId === cat.id ? (
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <input
                        value={editName}
                        onChange={(e) => { setEditName(e.target.value); setEditError('') }}
                        autoFocus
                        disabled={isSaving}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSave(cat.id)
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-base text-text-primary outline-none focus:border-primary/50 w-full disabled:opacity-50"
                      />
                      {editError && <span className="text-xs text-error">{editError}</span>}
                    </div>
                  ) : (
                    <span className="bg-nav-active/12 group-hover:bg-nav-active/18 rounded-full px-3 py-1 text-base text-text-secondary truncate max-w-[55%]">
                      {cat.name}
                    </span>
                  )}

                  {editingId === cat.id ? (
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={() => handleSave(cat.id)}
                        disabled={isSaving}
                        className="flex items-center justify-center size-7 rounded-md text-success hover:bg-nav-active/10 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Check size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={isSaving}
                        className="flex items-center justify-center size-7 rounded-md text-text-muted hover:bg-nav-active/10 hover:text-text-secondary transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="bg-nav-active/12 group-hover:bg-nav-active/18 rounded-full px-2 py-0.5 text-sm text-text-secondary transition-colors">
                        {cat.wordCount} words
                      </span>
                      <button
                        onClick={() => startEdit(cat)}
                        className="flex items-center justify-center size-7 rounded-md text-text-muted hover:bg-nav-active/10 hover:text-text-secondary transition-colors cursor-pointer"
                      >
                        <Pencil size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="flex items-center justify-center size-7 rounded-md text-text-muted hover:bg-nav-active/10 hover:text-error transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>

      <DeleteCategoryDialog
        category={deleteTarget}
        categories={categories}
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
