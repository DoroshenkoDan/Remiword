'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { List, Zap, FileText, ChartColumn, Settings } from 'lucide-react'
import { UserAvatar } from './UserAvatar'
interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Words', href: '/words', icon: <List strokeWidth={1.5} className="size-4.5" /> },
  { label: 'Quiz', href: '/quiz', icon: <Zap strokeWidth={1.5} className="size-4.5" /> },
  { label: 'Grammar', href: '/grammar', icon: <FileText strokeWidth={1.5} className="size-4.5" /> },
  { label: 'Progress', href: '/progress', icon: <ChartColumn strokeWidth={1.5} className="size-4.5" /> },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col max-h-screen w-[220px] shrink-0 bg-background border-r border-nav-active/10">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5">
        <div className="flex items-center justify-center size-9 rounded-[10px] bg-primary shrink-0">
          <span className="text-lg font-medium text-text-primary">R</span>
        </div>
        <span className="text-[20px] font-medium text-text-primary tracking-[-0.3px]">Remiword</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, href, icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 mx-3 rounded-lg text-md transition-colors',
                isActive
                  ? 'bg-primary/15 text-nav-active font-medium'
                  : 'text-nav-inactive font-normal hover:bg-white/5'
              )}
            >
              {icon}
              {label}
            </Link>
          )
        })}
        <div className='border-t border-border my-1' />
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 mx-3 rounded-lg text-md transition-colors ',
            pathname === '/settings'
              ? 'bg-primary/15 text-nav-active font-medium'
              : 'text-nav-inactive font-normal hover:bg-white/5'
          )}
        >
          <Settings strokeWidth={1.5} className="size-4.5" />
          Settings
        </Link>
      </nav>

      <div className='px-6 py-4 w-full'>
        <UserAvatar />
      </div>

    </aside>
  )
}
