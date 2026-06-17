'use client'

interface SpellingActionsProps {
  isActive: boolean
  canSubmit: boolean
  onSubmit: () => void
}

export function SpellingActions({ isActive, canSubmit, onSubmit }: SpellingActionsProps) {
  if (!isActive) return null

  return (
    <>
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full py-3.5 rounded-lg bg-primary text-text-primary text-md font-medium cursor-pointer border-none hover:opacity-80 transition-opacity disabled:opacity-40"
      >
        Check
      </button>
      <span className="text-xs text-text-muted text-center">Press Enter to confirm</span>
    </>
  )
}
