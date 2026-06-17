'use client'

import { type RefObject } from 'react'
import { cn } from '@/lib/utils'

interface SpellingInputProps {
  inputRef: RefObject<HTMLInputElement | null>
  value: string
  isActive: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  onNext: () => void
}

export function SpellingInput({ inputRef, value, isActive, onChange, onSubmit, onNext }: SpellingInputProps) {
  return (
    <div className={cn(
      'flex rounded-lg border transition-colors overflow-hidden',
      isActive
        ? 'border-nav-active/30 focus-within:border-nav-active/60'
        : 'border-nav-active/10 opacity-40',
    )}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return
          isActive ? onSubmit() : onNext()
        }}
        disabled={!isActive}
        placeholder={isActive ? 'Type your answer…' : ''}
        className="flex-1 bg-transparent text-center text-[20px] font-medium text-text-primary placeholder:text-text-muted outline-none px-4 py-4"
      />
    </div>
  )
}
