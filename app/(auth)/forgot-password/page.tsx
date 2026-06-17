import { BreadcrumbHeader } from '@/components/layout/BreadcrumbHeader'
import { ForgotPasswordForm } from './_components/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <>
      <BreadcrumbHeader title="Forgot Password" backHref="/login" backLabel="Sign In" />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-100 px-5 py-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  )
}
