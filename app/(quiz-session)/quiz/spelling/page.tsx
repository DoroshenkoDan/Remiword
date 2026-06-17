import { Suspense } from 'react'
import { SpellingView } from './_components/SpellingView'

export default function SpellingPage() {
  // TODO: replace null fallback with a proper loading skeleton/spinner
  return (
    <Suspense fallback={null}>
      <SpellingView />
    </Suspense>
  )
}
