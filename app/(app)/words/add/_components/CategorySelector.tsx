'use client'
import { useRef, useState } from 'react'
import { Plus, Check, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categoryNameWithDupeCheck } from '@/lib/schemas/category'

const ADD_NEW_VALUE = '__add_new__'

interface CategorySelectorProps {
  value: string
  categories: string[]
  onChange: (cat: string | null) => void
  onAddCategory: (name: string) => void
  label?: string
}

export function CategorySelector({
  value,
  categories,
  onChange,
  onAddCategory,
  label = 'Add to category',
}: CategorySelectorProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSelectChange = (val: string | null) => {
    if (val === ADD_NEW_VALUE) {
      setIsAdding(true)
      setNewName('')
      setError(null)
      setTimeout(() => inputRef.current?.focus(), 0)
      return
    }
    onChange(val)
  }

  const handleCancel = () => {
    setIsAdding(false)
    setNewName('')
    setError(null)
  }

  const handleConfirm = () => {
    const schema = categoryNameWithDupeCheck(categories)
    const result = schema.safeParse(newName)
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    onAddCategory(result.data)
    setIsAdding(false)
    setNewName('')
    setError(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') handleCancel()
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-text-muted">{label}</span>

      {(isAdding || categories.length === 0) ? (
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={newName}
              onChange={(e) => { setNewName(e.target.value); setError(null) }}
              onKeyDown={handleKeyDown}
              placeholder="Category name…"
              maxLength={50}
              className={`flex-1 bg-surface border rounded-[8px] px-3 py-2 text-[13px] text-text-primary placeholder:text-text-muted outline-none transition-colors ${
                error ? 'border-error/60 focus:border-error' : 'border-nav-active/40 focus:border-primary/60'
              }`}
            />
            <button
              onClick={handleConfirm}
              disabled={!newName.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-primary text-text-primary border-none cursor-pointer disabled:opacity-40 disabled:cursor-default hover:opacity-80 transition-opacity shrink-0"
            >
              <Check size={15} strokeWidth={1.5} />
            </button>
            {categories.length > 0 && (
              <button
                onClick={handleCancel}
                className="flex items-center justify-center w-9 h-9 rounded-[8px] border border-border text-text-primary hover:border-border-strong transition-colors cursor-pointer shrink-0"
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            )}
          </div>
          {error && (
            <span className="text-[11px] text-error">{error}</span>
          )}
        </div>
      ) : (
        /* Category select */
        <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger className="bg-surface border-nav-active/30 text-text-secondary text-[13px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
            <SelectItem value={ADD_NEW_VALUE} className="text-nav-active">
              <span className="flex items-center gap-1.5">
                <Plus size={13} strokeWidth={1.5} />
                Add New
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
