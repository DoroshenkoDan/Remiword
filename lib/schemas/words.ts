import { z } from 'zod'

export const editWordSchema = z.object({
  word: z.string().min(1, 'Required').max(100, 'Max 100 characters'),
  translation: z.string().min(1, 'Required').max(200, 'Max 200 characters'),
  category_id: z.string().nullable(),
})

export type EditWordFormValues = z.infer<typeof editWordSchema>
