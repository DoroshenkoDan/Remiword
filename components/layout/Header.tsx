'use client'

import { usePathname } from 'next/navigation'
import { Settings } from 'lucide-react'
import { UserAvatar } from './UserAvatar'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-background border-b border-nav-active/10">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center size-9 rounded-[10px] bg-primary shrink-0">
          <span className="text-lg font-medium text-text-primary">R</span>
        </div>
        <span className="text-[17px] font-medium text-text-primary tracking-[-0.3px]">Remiword</span>
      </div>
      <UserAvatar />
    </header>
  )
}
