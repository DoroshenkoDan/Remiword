'use client'

import { useState, useRef, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

async function verifyEmail({ email, token }: { email: string; token: string }) {
  const supabase = createClient()
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' })
  if (error) throw new Error(error.message)
}

async function resendCode(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resend({ type: 'signup', email })
  if (error) throw new Error(error.message)
}

export function VerificationForm({ email }: { email: string }) {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const isComplete = otp.every(d => d !== '')
  const canResend = countdown === 0

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)
    if (digit && index < 7) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8)
    const newOtp = Array(8).fill('')
    digits.split('').forEach((d, i) => { newOtp[i] = d })
    setOtp(newOtp)
    inputRefs.current[Math.min(digits.length, 7)]?.focus()
  }

  const { mutate: verify, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success('Email confirmed!')
      router.push('/words')
      router.refresh()
    },
    onError: (error) => toast.error(error.message),
  })

  const { mutate: resend, isPending: isResending } = useMutation({
    mutationFn: resendCode,
    onSuccess: () => {
      toast.success('Code sent!')
      setCountdown(60)
    },
    onError: (error) => toast.error(error.message),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isComplete) return
    verify({ email, token: otp.join('') })
  }

  const otpInputClass =
    'w-[60px] h-[68px] bg-background border border-border rounded-[10px] text-center text-xl font-medium text-text-primary outline-none focus:border-primary/50 transition-colors select-none'

  return (
    <form
      onSubmit={handleSubmit}
      className="w-max bg-surface border border-border rounded-[12px] px-16 pt-14 pb-14 flex flex-col items-center"
    >
      {/* Logo */}
      <div className="w-16 h-16 bg-primary rounded-[12px] flex items-center justify-center mb-8 shrink-0">
        <span className="text-[28px] font-medium text-white leading-none">W</span>
      </div>

      {/* Title */}
      <h1 className="text-[32px] font-medium text-text-primary tracking-[-0.5px] leading-[38.4px] text-center mb-4">
        Check your email
      </h1>

      {/* Subtitle */}
      <div className="flex flex-col items-center mb-12">
        <p className="text-lg text-text-secondary text-center">We sent an 8-digit code to</p>
        <p className="text-lg font-semibold text-primary text-center">{email || 'your@email.com'}</p>
      </div>

      {/* OTP inputs */}
      <div className="flex gap-3 mb-12">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            onFocus={e => e.target.select()}
            onPaste={handlePaste}
            className={otpInputClass}
          />
        ))}
      </div>

      {/* Resend */}
      <div className="flex flex-col items-center gap-2.5 mb-12">
        <div className="flex items-center">
          <span className="text-[15px] text-text-secondary">{"Didn't receive the code? "}</span>
          <button
            type="button"
            disabled={!canResend || isResending}
            onClick={() => resend(email)}
            className={`text-[15px] font-medium transition-colors ${canResend && !isResending
              ? 'text-text-primary hover:text-text-secondary cursor-pointer'
              : 'text-text-muted cursor-not-allowed'
              }`}
          >
            Resend code
          </button>
        </div>
        {!canResend && (
          <p className="text-sm text-text-muted">Resend via {formatTime(countdown)}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isComplete || isPending}
        className={`h-14 w-full rounded-[10px] text-lg font-medium transition-colors ${isComplete
          ? 'bg-primary text-text-primary hover:bg-primary-hover cursor-pointer'
          : 'bg-background text-text-muted cursor-not-allowed'
          }`}
      >
        {isPending ? 'Перевірка...' : 'Підтвердити'}
      </button>
    </form>
  )
}
