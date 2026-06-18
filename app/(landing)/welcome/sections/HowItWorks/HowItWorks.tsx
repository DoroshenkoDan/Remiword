import { HowItWorksHeading } from './_components/HowItWorksHeading'
import { StepsCardMotion } from './_components/StepsCardMotion'

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="snap-start h-screen flex items-center justify-center pt-10 xl:pt-0"
    >
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 xl:gap-7.75">
        <HowItWorksHeading />
        <StepsCardMotion />
      </div>
    </section>
  )
}
