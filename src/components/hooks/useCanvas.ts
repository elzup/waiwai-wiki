import { useEffect, useState } from 'react'

export const useCanvas = (draw: (e: HTMLCanvasElement) => void) => {
  const [png, setPng] = useState<string | null>(null)

  useEffect(() => {
    const canvasElem = document.createElement('canvas')

    draw(canvasElem)

    setPng(canvasElem.toDataURL())
  }, [])

  return png
}
