import { LandingBackground } from './_components/LandingBackground'
import { LandingHeader } from './_components/LandingHeader'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingBackground />
      <LandingHeader />
      <div id="landing-scroll" className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {children}
      </div>
    </>
  )
}
