import { z } from 'zod'

export const nameSchema = z.object({
  name: z
    .string()
    .min(2, 'At least 2 characters')
    .max(50, 'Max 50 characters'),
})

export type NameFormValues = z.infer<typeof nameSchema>

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Required'),
  newPassword: z.string().min(8, 'At least 8 characters'),
  confirmPassword: z.string().min(1, 'Required'),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
