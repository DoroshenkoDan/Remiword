'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchUserProfile } from '@/lib/supabase/profile'

export function useUserProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
  })
}
