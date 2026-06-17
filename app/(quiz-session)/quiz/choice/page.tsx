import { Suspense } from 'react'
import { ChoiceView } from './_components/ChoiceView'

export default function ChoicePage() {
  // TODO: replace null fallback with a proper loading skeleton/spinner
  return (
    <Suspense fallback={null}>
      <ChoiceView />
    </Suspense>
  )
}
