'use client'

import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { loadTextShape } from '@tsparticles/shape-text'
import { BACKGROUND_WORDS } from './wordsList'

export function WordsParticles() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      await loadTextShape(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 28, density: { enable: true, area: 1000 } },
        shape: {
          type: 'text',
          options: {
            text: {
              value: BACKGROUND_WORDS,
              font: 'Inter, ui-sans-serif, system-ui, sans-serif',
              weight: '500',
              style: '',
              fill: true,
            },
          },
        },
        color: { value: '#93C5FD' },
        size: { value: { min: 12, max: 34 } },
        opacity: {
          value: { min: 0.014, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.25,
            sync: false,
            startValue: 'random',
          },
        },
        move: {
          enable: true,
          speed: { min: 0.15, max: 0.5 },
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
      },
    }),
    [],
  )

  if (!ready) return null

  return (
    <Particles
      id="landing-words-particles"
      options={options}
      className="absolute inset-0 h-full w-full"
    />
  )
}
