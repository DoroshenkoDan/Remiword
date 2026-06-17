import { WordsParticles } from './WordsParticles'

export function LandingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      <div className="landing-blob-tl" />
      <div className="landing-blob-br" />
      <WordsParticles />
    </div>
  )
}
