import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbHeaderProps {
  title: string
  backHref: string
  backLabel: string
}

export function BreadcrumbHeader({ title, backHref, backLabel }: BreadcrumbHeaderProps) {
  return (
    <div className="flex items-center gap-2 w-full px-8 py-4 border-b border-border shrink-0">
      <Link
        href={backHref}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        <span className="text-md">{backLabel}</span>
      </Link>
      <ChevronRight size={14} strokeWidth={1.5} className="text-text-muted" />
      <span className="text-md text-text-primary">{title}</span>
    </div>
  )
}
