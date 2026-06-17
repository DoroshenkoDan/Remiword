import Link from 'next/link'

export function ProgressSaveBanner() {
  return (
    <div className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3">
      <span className="size-1.5 rounded-full bg-primary shrink-0" />
      <p className="flex-1 text-[11px] text-text-secondary leading-relaxed">
        Your progress is saved locally.{' '}
        <span className="text-text-muted">Create an account to sync across devices.</span>
      </p>
      <Link
        href="/register"
        className="shrink-0 text-[11px] font-medium text-primary hover:opacity-80 transition-opacity"
      >
        Sign up
      </Link>
    </div>
  )
}
