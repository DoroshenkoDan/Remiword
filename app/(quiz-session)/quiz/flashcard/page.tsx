import { Suspense } from 'react'
import { FlashcardView } from './_components/FlashcardView'

export default function FlashcardPage() {
  // TODO: replace null fallback with a proper loading skeleton/spinner
  return (
    <Suspense fallback={null}>
      <FlashcardView />
    </Suspense>
  )
}
