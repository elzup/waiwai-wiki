import { useEffect, useState } from 'react'

export type DrawFunc = (e: HTMLCanvasElement) => void
export const useCanvas = (draw: DrawFunc) => {
  const [png, setPng] = useState<string | null>(null)

  useEffect(() => {
    const canvasElem = document.createElement('canvas')

    draw(canvasElem)

    setPng(canvasElem.toDataURL())
  }, [])

  return png
}
