'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '§', '$', '%', '&', '/', '(', ')', '=', '?', '_', '<', '>', '^', '*', '#', '-', ':', ';', '~']


function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function makeScrambled(length: number) {
  return Array.from({ length }, randomChar).join('')
}

export type ScrambleState = 'scrambled' | 'revealing' | 'revealed'

interface ScrambleTextProps {
  text: string
  state: ScrambleState
  className?: string
  speed?: number
}

export function ScrambleText({ text, state, className, speed = 50 }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(() =>
    state === 'revealed' ? text : makeScrambled(text.length)
  )
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (state === 'revealed') {
      setDisplayed(text)
      return
    }

    if (state === 'scrambled') {
      return
    }

    // 'revealing' — port of the CodePen algorithm
    const chars = text.split('')
    const len = chars.length
    let count = 0
    let j = 0

    intervalRef.current = setInterval(() => {
      let next = ''
      for (let i = 0; i < len; i++) {
        if (i <= j && count >= len) {
          next += chars[i]
        } else {
          next += randomChar()
        }
      }
      setDisplayed(next)
      count++
      if (count >= len) {
        j++
        if (j >= len) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          setDisplayed(text)
        }
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state, text, speed])

  return <span className={className}>{displayed}</span>
}
