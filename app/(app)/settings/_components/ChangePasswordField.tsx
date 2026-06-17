'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Check, X, Eye, EyeOff, Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { changePasswordSchema, type ChangePasswordFormValues } from '@/lib/schemas/settings'

async function changePassword(currentPassword: string, newPassword: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) throw new Error('Not authenticated')

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })
  if (signInError) throw new Error('Current password is incorrect')

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw new Error(error.message)
}

async function sendResetLink(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
  })
  if (error) throw new Error(error.message)
}

interface Props {
  email: string
}

export function ChangePasswordField({ email }: Props) {
  const [open, setOpen] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  })

  const { mutate: save, isPending } = useMutation({
    mutationFn: (data: ChangePasswordFormValues) =>
      changePassword(data.currentPassword, data.newPassword),
    onSuccess: () => {
      toast.success('Password updated')
      reset()
      setOpen(false)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const { mutate: sendReset, isPending: isSendingReset } = useMutation({
    mutationFn: () => sendResetLink(email),
    onSuccess: () => toast.success('Reset link sent - check your email'),
    onError: (e: Error) => toast.error(e.message),
  })

  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  const inputClass = (hasError: boolean) =>
    `flex-1 bg-background border rounded-lg pl-3 pr-10 py-2 text-sm text-text-primary outline-none transition-colors ${hasError ? 'border-error/60' : 'border-primary/50'
    }`

  return (
    <div className="flex flex-col gap-1.5">
      <div className='w-full flex items-center justify-between'>
        <span className="text-xs text-text-muted">Password</span>
        {open &&
          <button
            type="button"
            onClick={() => sendReset()}
            disabled={isSendingReset}
            className="self-start text-xs text-primary hover:underline disabled:opacity-50 cursor-pointer"
          >
            {isSendingReset ? 'Sending...' : 'Forgot password ?'}
          </button>}
      </div>
      {open ? (
        <form onSubmit={handleSubmit((d) => save(d))} className="flex flex-col gap-3">

          {/* Current password */}
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center">
              <input
                {...register('currentPassword')}
                type={showCurrent ? 'text' : 'password'}
                placeholder="Current password"
                autoFocus
                className={inputClass(!!errors.currentPassword)}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(v => !v)}
                className="absolute right-3 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showCurrent ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>
            {errors.currentPassword && (
              <span className="text-xs text-error">{errors.currentPassword.message}</span>
            )}
          </div>

          {/* New password */}
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center">
              <input
                {...register('newPassword')}
                type={showNew ? 'text' : 'password'}
                placeholder="New password"
                className={inputClass(!!errors.newPassword)}
              />
              <button
                type="button"
                onClick={() => setShowNew(v => !v)}
                className="absolute right-3 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showNew ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-xs text-error">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center">
              <input
                {...register('confirmPassword')}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm new password"
                className={inputClass(!!errors.confirmPassword)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 text-text-muted hover:text-text-secondary transition-colors"
              >
                {showConfirm ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-error">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center rounded-lg bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
            >
              <span className='text-sm p-1'>
                Save new password
              </span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-border-strong transition-colors cursor-pointer shrink-0"
            >
              <span className='text-sm p-1'>
                Deny changes
              </span>
            </button>
          </div>

        </form>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-text-primary">••••••••</span>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center size-7 rounded-md text-text-muted hover:text-text-secondary cursor-pointer transition-colors shrink-0"
          >
            <Pencil size={13} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  )
}
