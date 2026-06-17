'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { nameSchema } from '@/lib/schemas/settings'

async function updateName(name: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const [{ error: authError }, { error: profileError }] = await Promise.all([
    supabase.auth.updateUser({ data: { name } }),
    supabase.from('user_profiles').update({ name }).eq('id', user.id),
  ])
  if (authError) throw new Error(authError.message)
  if (profileError) throw new Error(profileError.message)
}

function validate(value: string): string | null {
  const result = nameSchema.shape.name.safeParse(value.trim())
  return result.success ? null : result.error.issues[0].message
}

interface Props {
  currentName: string
}

export function NameField({ currentName }: Props) {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [nameValue, setNameValue] = useState(currentName)

  const trimmed = nameValue.trim()
  const error = validate(nameValue)
  const isUnchanged = trimmed === currentName
  const canSave = !error && !isUnchanged

  const { mutate: saveName, isPending } = useMutation({
    mutationFn: updateName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      setEditing(false)
      toast.success('Name updated')
    },
    onError: () => toast.error('Failed to update name'),
  })

  const handleEdit = () => {
    setNameValue(currentName)
    setEditing(true)
  }

  const handleCancel = () => {
    setNameValue(currentName)
    setEditing(false)
  }

  const handleSave = () => {
    if (!canSave || isPending) return
    saveName(trimmed)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-text-muted">Name</span>
      {editing ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
                if (e.key === 'Escape') handleCancel()
              }}
              autoFocus
              maxLength={51}
              className={`flex-1 bg-background border rounded-lg px-3 py-2 text-sm text-text-primary outline-none transition-colors ${
                error ? 'border-error/60' : 'border-primary/50'
              }`}
            />
            <button
              onClick={handleSave}
              disabled={isPending || !canSave}
              className="flex items-center justify-center size-8 rounded-lg bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-primary/90 transition-colors shrink-0"
            >
              <Check size={14} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="flex items-center justify-center size-8 rounded-lg border border-border text-text-secondary cursor-pointer hover:border-border-strong transition-colors shrink-0"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
          {error && !isUnchanged && (
            <span className="text-xs text-error">{error}</span>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-text-primary">
            {currentName || <span className="text-text-muted">Not set</span>}
          </span>
          <button
            onClick={handleEdit}
            className="flex items-center justify-center size-7 rounded-md text-text-muted hover:text-text-secondary cursor-pointer transition-colors shrink-0"
          >
            <Pencil size={13} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  )
}
