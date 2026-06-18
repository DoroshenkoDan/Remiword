
import { FeatureGridMotion } from './_components/FeatureGridMotion'

export function EverythingYouNeedToLearn() {
  return (
    <section
      id="features"
      className="snap-start h-screen flex items-center justify-center pt-10 xl:pt-0"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <FeatureGridMotion />
      </div>
    </section>
  )
}
