import styled from 'styled-components'
import * as React from 'react'
import { useMeasure } from 'react-use'

const SizeDefStyle = styled.div<{ height: number; width: number }>`
  --w: ${(p) => p.width}px;
  --h: ${(p) => p.height}px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

function calcRate(
  width: number,
  height: number,
  lRate?: number,
  pRate?: number
) {
  const maxWidth = pRate !== undefined ? height * pRate : width
  const maxHeight = lRate !== undefined ? width / lRate : height

  return [Math.min(width, maxWidth), Math.min(height, maxHeight)]
}

const SizeDef = ({
  children,
  landRate,
  portRate,
}: React.PropsWithChildren<{ landRate?: number; portRate?: number }>) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [w, h] = calcRate(width, height, landRate, portRate)

  return (
    <SizeDefStyle ref={ref} width={w} height={h}>
      {children}
    </SizeDefStyle>
  )
}

export default SizeDef
