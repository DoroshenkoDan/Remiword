'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { loginSchema, type LoginFormData } from '../../../../lib/schemas/login'

async function loginUser(data: LoginFormData) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  if (error) throw new Error(error.message)
}

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push('/words')
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const inputClass = 'h-[46px] w-full rounded-[10px] bg-surface border border-border px-[17px] text-md text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors'

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col">
      <h1 className="text-[28px] leading-10.5 font-medium text-text-primary">Welcome back</h1>
      <p className="mt-1 mb-6 text-md text-text-secondary">Sign in to sync your words across devices</p>

      {/* Email */}
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm font-medium text-text-secondary">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          className={inputClass}
        />
        {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-secondary">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
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
        {errors.password && <p className="text-xs text-error mt-1">{errors.password.message}</p>}
      </div>

      {/* Forgot password */}
      <div className="flex justify-end py-4">
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="h-12.5 w-full rounded-[10px] bg-primary text-text-primary text-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-60 cursor-pointer mb-4"
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-border-subtle" />
        <span className="text-sm text-text-muted">or</span>
        <div className="flex-1 h-px bg-border-subtle" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => toast.info('Google sign-in coming soon')}
        className="h-11.5 w-full rounded-[10px] border border-border flex items-center justify-center gap-2.5 text-text-primary text-md hover:bg-surface transition-colors cursor-pointer mb-6"
      >
        <Image src="/google-icon.svg" alt="Google" width={18} height={18} />
        Continue with Google
      </button>

      {/* Register link */}
      <p className="text-center text-md text-text-muted mb-2">
        {"Don't have an account? "}
        <Link href="/register" className="text-primary font-medium hover:underline">Create one</Link>
      </p>
    </form>
  )
}
