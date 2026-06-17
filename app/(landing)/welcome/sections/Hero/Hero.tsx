import { HeroCopy } from './_components/HeroCopy'
import { HeroMetrics } from './_components/HeroMetrics'
import { HeroUIPreview } from './_components/HeroUIPreview'

export function Hero() {
  return (
    <section
      id="hero"
      className="snap-start relative h-screen flex items-center overflow-hidden px-4 sm:px-8 lg:px-15"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 py-24">
        {/* left: copy + metrics */}
        <div className="flex flex-col gap-10">
          <HeroCopy />
          <HeroMetrics />
        </div>

        {/* right: UI preview */}
        <HeroUIPreview />
      </div>
    </section>
  )
}
