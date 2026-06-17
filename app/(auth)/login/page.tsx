import { BreadcrumbHeader } from '@/components/layout/BreadcrumbHeader'
import { LoginForm } from './_components/LoginForm'

export default function LoginPage() {
  return (
    <>
      <BreadcrumbHeader title="Sign In" backHref="/" backLabel="Home" />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-100 px-5 py-8">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
