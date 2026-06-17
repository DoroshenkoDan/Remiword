'use client'

import { LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { signOutAction } from '@/app/(auth)/actions'
import { useUser } from '@/hooks/useUser'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export function UserAvatar() {
  const { data: user, isLoading } = useUser()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    queryClient.clear()
    await signOutAction()
  }

  if (isLoading) {
    return <div className="size-9 rounded-full bg-surface animate-pulse mx-6 my-4" />
  }

  if (!user) return null
  const name = user.user_metadata?.name as string ?? user.email ?? ''
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row-reverse md:flex-row items-center gap-3 md:px-6 md:py-4 w-full cursor-pointer">
        <div className="flex items-center justify-center size-9 rounded-full bg-primary text-white text-sm font-medium shrink-0">
          {initials}
        </div>
        <div className="hidden md:flex flex-col text-right md:text-left min-w-0 ">
          <span className="text-[13px] font-medium text-text-primary truncate">{name}</span>
          <span className="text-text-muted text-xs truncate">{user.email}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => router.push('/settings')} className="md:hidden">
          <Settings size={16} strokeWidth={1.5} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="md:hidden" />
        <DropdownMenuItem onClick={handleLogout} className="text-error">
          <LogOut size={16} strokeWidth={1.5} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
