import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'

export function GuestUserCard() {
  return (
    <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-full bg-primary/15 text-text-secondary text-lg font-medium shrink-0">
          ?
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-text-primary">Guest user</span>
          <span className="text-xs text-text-muted">14 words saved locally</span>
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-warning/8 border border-warning/20">
        <TriangleAlert size={14} strokeWidth={1.5} className="text-warning shrink-0 mt-0.5" />
        <span className="text-xs text-text-secondary leading-relaxed">
          Words stored in browser only. Creating an account will save everything.
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/register"
          className="flex-1 flex items-center justify-center py-2 rounded-lg bg-primary text-text-primary text-sm font-medium transition-colors hover:bg-primary/90"
        >
          Create account
        </Link>
        <Link
          href="/login"
          className="flex-1 flex items-center justify-center py-2 rounded-lg border border-border text-text-secondary text-sm transition-colors hover:border-border-strong"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}
