import { BreadcrumbHeader } from '@/components/layout/BreadcrumbHeader'
import { ResetPasswordForm } from './_components/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <>
      <BreadcrumbHeader title="Reset Password" backHref="/login" backLabel="Sign In" />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-100 px-5 py-8">
          <ResetPasswordForm />
        </div>
      </div>
    </>
  )
}
