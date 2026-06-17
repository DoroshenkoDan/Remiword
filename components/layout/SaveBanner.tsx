'use client'

/**
 * Notification banner shown when user has 10+ words saved locally but no account.
 * Prompts user to create an account to keep their words safe.
 */

interface SaveBannerProps {
  /** Number of words saved in localStorage */
  wordCount: number
  /** Called when user clicks "Save now" */
  onSave: () => void
}

export function SaveBanner({ wordCount, onSave }: SaveBannerProps) {
  if (wordCount < 10) return null

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 mx-4 mt-3 rounded-[10px]"
      style={{
        background: 'rgba(79,110,247,0.08)',
        border: '0.5px solid rgba(79,110,247,0.25)',
      }}
    >
      {/* Blue dot */}
      <div
        className="shrink-0 rounded-full"
        style={{ width: 6, height: 6, background: '#4F6EF7' }}
      />

      {/* Message */}
      <p style={{ fontSize: 11, fontWeight: 400, color: '#A5B4FC', flex: 1 }}>
        You have {wordCount} words saved locally. Create an account to keep them safe.
      </p>

      {/* CTA */}
      <button
        onClick={onSave}
        className="shrink-0 hover:underline transition-opacity hover:opacity-80"
        style={{ fontSize: 11, fontWeight: 500, color: '#4F6EF7', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        Save now
      </button>
    </div>
  )
}
