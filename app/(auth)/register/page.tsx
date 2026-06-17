import { BreadcrumbHeader } from '@/components/layout/BreadcrumbHeader'
import { RegisterForm } from './_components/RegisterForm'

export default function RegisterPage() {
  return (
    <>
      <BreadcrumbHeader title="Create account" backHref="/" backLabel="Home" />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-100 px-5 py-8">
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
