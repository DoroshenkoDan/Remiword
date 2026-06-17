import { BreadcrumbHeader } from '@/components/layout/BreadcrumbHeader'
import { VerificationForm } from './_components/VerificationForm'

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email = '' } = await searchParams

  return (
    <>
      <BreadcrumbHeader title="Verify email" backHref="/register" backLabel="Register" />
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <VerificationForm email={email} />
      </div>
    </>
  )
}
