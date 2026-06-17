'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { registerSchema, type RegisterFormData } from '../../../../lib/schemas/register'
import Image from 'next/image'
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

async function registerUser(data: RegisterFormData) {
  const supabase = createClient()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (authError) throw new Error(authError.message)

  if (authData.session && authData.user) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({ id: authData.user.id })

    if (profileError) throw new Error('Failed to create profile')
  }
}

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const password = useWatch({ control, name: 'password', defaultValue: '' })
  const strength = getPasswordStrength(password)

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (_, variables) => {
      toast.success('The confirmation code has been sent to your email.')
      router.push(`/register/verification?email=${encodeURIComponent(variables.email)}`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const inputClass = 'h-11 w-full rounded-[10px] bg-background border border-border px-[15px] text-md text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors'

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col">
      <h1 className="text-[28px] leading-10.5 font-normal text-text-primary">Create account</h1>
      <p className="mt-1 mb-6 text-sm text-text-secondary">Save words, track progress, learn faster</p>

      {/* Email */}
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm text-text-secondary">Email</label>
        <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
        {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5 mb-2">
        <label className="text-sm text-text-secondary">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            className="h-11 w-full rounded-[10px] bg-background border border-border pl-3.75 pr-11 text-md text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors"
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

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="h-12.5 w-full rounded-[10px] bg-primary text-text-primary text-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-60 cursor-pointer mb-4"
      >
        {isPending ? 'Creating account...' : 'Create account'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-text-muted">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => toast.info('Google sign-up coming soon')}
        className="h-11.5 w-full rounded-[10px] border border-border flex items-center justify-center gap-2.5 text-text-primary text-md hover:bg-surface transition-colors cursor-pointer mb-5"
      >
        <Image src="/google-icon.svg" alt='google-logo' width={18} height={18} />
        Continue with Google
      </button>

      {/* Sign in */}
      <p className="text-center text-md text-text-muted">
        {'Already have an account? '}
        <Link href="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </form>
  )
}
