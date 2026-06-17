'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { resetPasswordSchema, type ResetPasswordFormData } from '../../../../lib/schemas/resetPassword'

const strengthColors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success']

function getPasswordStrength(password: string): number {
  if (!password) return 0
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return strength
}

async function updatePassword(password: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(error.message)
  // Recovery session is single-use — sign out so the user re-logs with the new password.
  await supabase.auth.signOut()
}

export function ResetPasswordForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, control, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const password = useWatch({ control, name: 'password', defaultValue: '' })
  const strength = getPasswordStrength(password)

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ResetPasswordFormData) => updatePassword(data.password),
    onSuccess: () => {
      toast.success('Password updated - please sign in')
      router.push('/login')
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col">
      <h1 className="text-[28px] leading-10.5 font-medium text-text-primary">Set a new password</h1>
      <p className="mt-1 mb-6 text-md text-text-secondary">Choose a strong password for your account</p>

      {/* New password */}
      <div className="flex flex-col gap-1.5 mb-2">
        <label className="text-sm font-medium text-text-secondary">New password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            className="h-[46px] w-full rounded-[10px] bg-surface border border-border pl-[17px] pr-11 text-md text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
          >
            {showPassword
              ? <EyeOff size={16} strokeWidth={1.5} />
              : <Eye size={16} strokeWidth={1.5} />
            }
          </button>
        </div>
        {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
      </div>

      {/* Password strength */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-0.75 rounded-full transition-colors duration-300 ${i < strength ? strengthColors[strength - 1] : 'bg-border-subtle'}`}
          />
        ))}
      </div>

      {/* Confirm password */}
      <div className="flex flex-col gap-1.5 mb-6">
        <label className="text-sm font-medium text-text-secondary">Confirm password</label>
        <input
          {...register('confirmPassword')}
          type={showPassword ? 'text' : 'password'}
          placeholder="Repeat your password"
          autoComplete="new-password"
          className="h-[46px] w-full rounded-[10px] bg-surface border border-border px-[17px] text-md text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors"
        />
        {errors.confirmPassword && <p className="text-xs text-error">{errors.confirmPassword.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="h-12.5 w-full rounded-[10px] bg-primary text-text-primary text-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-60 cursor-pointer"
      >
        {isPending ? 'Updating...' : 'Update password'}
      </button>
    </form>
  )
}
