'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchWords, saveWords } from '@/lib/supabase/words'

export function useWords() {
  const queryClient = useQueryClient()

  const { data: words = [], isLoading } = useQuery({
    queryKey: ['words'],
    queryFn: fetchWords,
  })

  const { mutate: save, isPending: isSaving } = useMutation({
    mutationFn: saveWords,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return { words, isLoading, saveWords: save, isSaving }
}
