'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { toast } from 'sonner'
import { MailCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../../../lib/schemas/forgotPassword'

async function sendResetLink(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
  })
  if (error) throw new Error(error.message)
}

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordFormData) => sendResetLink(data.email),
    onSuccess: (_, variables) => {
      setSentTo(variables.email)
      toast.success('Reset link sent - check your email')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const inputClass = 'h-[46px] w-full rounded-[10px] bg-surface border border-border px-[17px] text-md text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors'

  if (sentTo) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-surface border border-border rounded-[12px] flex items-center justify-center mb-6">
          <MailCheck size={28} strokeWidth={1.5} className="text-primary" />
        </div>
        <h1 className="text-[28px] leading-10.5 font-medium text-text-primary">Check your email</h1>
        <p className="mt-1 mb-1 text-md text-text-secondary">We sent a password reset link to</p>
        <p className="mb-6 text-md font-semibold text-primary">{sentTo}</p>
        <p className="text-sm text-text-muted">
          {"Didn't get it? Check your spam folder or "}
          <button
            type="button"
            onClick={() => mutate({ email: sentTo })}
            disabled={isPending}
            className="text-primary hover:underline disabled:opacity-60 cursor-pointer"
          >
            resend
          </button>
        </p>
        <Link href="/login" className="mt-6 text-sm text-primary hover:underline">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col">
      <h1 className="text-[28px] leading-10.5 font-medium text-text-primary">Forgot password?</h1>
      <p className="mt-1 mb-6 text-md text-text-secondary">Enter your email and we&apos;ll send you a reset link</p>

      {/* Email */}
      <div className="flex flex-col gap-1.5 mb-6">
        <label className="text-sm font-medium text-text-secondary">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          className={inputClass}
        />
        {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="h-12.5 w-full rounded-[10px] bg-primary text-text-primary text-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-60 cursor-pointer mb-4"
      >
        {isPending ? 'Sending...' : 'Send reset link'}
      </button>

      {/* Back to login */}
      <p className="text-center text-md text-text-muted">
        {'Remember your password? '}
        <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </form>
  )
}
