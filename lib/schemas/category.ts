import { z } from 'zod'

const RESERVED_VALUES = ['__add_new__']
const INJECTION_CHARS = /[<>{}"`\\|;=]/

export const categoryNameSchema = z
  .string()
  .min(2, 'Min 2 characters')
  .max(50, 'Max 50 characters')
  .refine((val) => !INJECTION_CHARS.test(val), 'Invalid characters')
  .refine((val) => !RESERVED_VALUES.includes(val.trim()), 'Invalid category name')
  .transform((val) => val.trim())

export function categoryNameWithDupeCheck(existing: string[]) {
  return categoryNameSchema.refine(
    (val) => !existing.some((c) => c.toLowerCase() === val.toLowerCase()),
    'Category already exists',
  )
}
