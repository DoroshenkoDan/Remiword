'use client'

/**
 * Unified "+ Add words" button.
 * Mobile: fixed FAB above the bottom tab bar.
 * Desktop: fixed top-right of the content area.
 */

import { Plus } from 'lucide-react'

interface AddWordsButtonProps {
  onClick: () => void
}

export function AddWordsButton({ onClick }: AddWordsButtonProps) {
  return (
    <>
      {/* Desktop — fixed top-right of content area */}
      <button
        onClick={onClick}
        className="hidden md:flex items-center gap-1.5 fixed top-6 right-6 z-10 px-4 py-[7px] rounded-[8px] bg-primary text-text-primary text-[13px] font-medium border-none cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Plus size={14} strokeWidth={1.5} />
        Add words
      </button>

      {/* Mobile — FAB above bottom nav */}
      <button
        onClick={onClick}
        className="md:hidden fixed bottom-[72px] right-4 z-40 flex items-center gap-1.5 px-5 py-[10px] rounded-full bg-primary text-text-primary text-[13px] font-medium shadow-lg border-none cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Plus size={14} strokeWidth={1.5} />
        Add words
      </button>
    </>
  )
}
