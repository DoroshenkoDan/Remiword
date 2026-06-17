'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { List, Zap, FileText, ChartColumn } from 'lucide-react'

interface Tab {
  label: string
  href: string
  icon: React.ReactNode
}

const tabs: Tab[] = [
  { label: 'Words', href: '/words', icon: <List strokeWidth={1.5} className="size-4.5" /> },
  { label: 'Quiz', href: '/quiz', icon: <Zap strokeWidth={1.5} className="size-4.5" /> },
  { label: 'Grammar', href: '/grammar', icon: <FileText strokeWidth={1.5} className="size-4.5" /> },
  { label: 'Progress', href: '/progress', icon: <ChartColumn strokeWidth={1.5} className="size-4.5" /> },
]

export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center h-14 bg-surface border-t border-nav-active/15">
      {tabs.map(({ label, href, icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full gap-1.25 transition-colors',
              isActive ? 'text-nav-active' : 'text-nav-inactive'
            )}
          >
            {icon}
            <span className={cn('text-xs', isActive ? 'font-medium' : 'font-normal')}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
