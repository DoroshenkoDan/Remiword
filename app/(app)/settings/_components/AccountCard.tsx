'use client'

import { useUser } from '@/hooks/useUser'
import { NameField } from './NameField'
import { ChangePasswordField } from './ChangePasswordField'

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?'
}

function formatMemberSince(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function AccountCard() {
  const { data: user } = useUser()

  const currentName = (user?.user_metadata?.name as string) ?? ''
  const initials = getInitials(currentName || user?.email || '')
  const memberSince = user?.created_at ? formatMemberSince(user.created_at) : null

  return (
    <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-full bg-primary text-white text-sm font-medium shrink-0">
          {initials}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span className="text-xs text-text-secondary truncate">{user?.email}</span>
          {memberSince && (
            <span className="text-xs text-text-muted">Member since {memberSince}</span>
          )}
        </div>
      </div>

      <div className="border-t border-border" />

      <NameField currentName={currentName} />

      <div className="border-t border-border" />

      <ChangePasswordField email={user?.email ?? ''} />
    </div>
  )
}
