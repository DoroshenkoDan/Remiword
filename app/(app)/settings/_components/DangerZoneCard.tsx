'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

async function deleteAccount() {
  const res = await fetch('/api/account/delete', { method: 'POST' })
  if (!res.ok) throw new Error('Failed to delete account')
}

export function DangerZoneCard() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: confirmDelete, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      queryClient.clear()
      router.push('/login')
      router.refresh()
    },
    onError: () => {
      toast.error('Failed to delete account. Please try again.')
    },
  })

  return (
    <div className="flex flex-col gap-4 bg-surface   rounded-xl p-5">
      <span className="text-2xs font-semibold text-error tracking-[0.08em]">DANGER ZONE</span>

      <div className="flex items-center justify-between gap-4 border-2 border-error/20 rounded-xl p-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-text-primary">Delete account</span>
          <span className="text-xs text-text-muted">Permanently deletes your account and all data</span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="shrink-0 flex items-center justify-center px-3 py-1.5 rounded-lg border border-error/40 text-error text-xs font-medium transition-colors hover:bg-error/10 cursor-pointer"
        >
          Delete
        </button>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-surface text-text-primary ring-0 border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-text-primary">Delete account?</AlertDialogTitle>
            <AlertDialogDescription className="text-text-secondary">
              This will permanently delete your account, all words, categories, and quiz history.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="px-4 py-2 rounded-lg border border-border text-text-secondary text-sm transition-colors hover:border-border-strong cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => { setOpen(false); confirmDelete() }}
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-error text-white text-sm font-medium hover:bg-error/90 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {isPending ? 'Deleting…' : 'Yes, delete'}
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
