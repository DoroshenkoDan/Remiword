'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/supabase/categories'

export function useCategories() {
  const queryClient = useQueryClient()

  const invalidateCategories = () =>
    queryClient.invalidateQueries({ queryKey: ['categories'] })

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    queryClient.invalidateQueries({ queryKey: ['words'] })
  }

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const { mutateAsync: createCategory, isPending: isAdding } = useMutation({
    mutationFn: (name: string) => addCategory(name),
    onSuccess: invalidateCategories,
  })

  const { mutateAsync: renameCategory, isPending: isRenaming } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => updateCategory(id, name),
    onSuccess: invalidateCategories,
  })

  const { mutateAsync: removeCategory, isPending: isRemoving } = useMutation({
    mutationFn: ({
      id,
      wordsAction,
      transferToId,
    }: {
      id: string
      wordsAction: 'move' | 'delete'
      transferToId?: string
    }) => deleteCategory(id, wordsAction, transferToId),
    onSuccess: invalidateAll,
  })

  return {
    categories,
    isLoading,
    createCategory,
    isAdding,
    renameCategory,
    isRenaming,
    removeCategory,
    isRemoving,
  }
}
