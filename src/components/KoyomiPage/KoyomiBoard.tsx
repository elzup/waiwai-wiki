import { schedulingBy } from '@elzup/kit'
import { Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { Koyomi } from '../../types'
import { endTimeNum, mapId, timeNum } from '../../utils'
import { getRangeKoyomi } from '../../utils/koyomi'

type Props = {
  koyomis: Koyomi[]
}

function KoyomiBoard({ koyomis }: Props) {
  const koyomiBlocks = useMemo(() => {
    const blocks = koyomis.map((koyomi) => ({
      koyomi,
      lines: schedulingBy(mapId(koyomi.times), ({ id, ...v }) => ({
        id,
        start: timeNum(v.time),
        end: endTimeNum(v),
      })),
    }))
    const range = getRangeKoyomi(koyomis)

    return { blocks, range }
  }, [koyomis])

  return (
    <div>
      {koyomiBlocks.blocks.map(({ koyomi, lines }) => (
        <div key={koyomi.id}>
          <Typography>{koyomi.title}</Typography>

          <div>
            {lines.map((cells, ci) => (
              <div key={ci} style={{ display: 'flex' }}>
                {cells.map((cell, i) => (
                  <div key={i}>{cell.label}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default KoyomiBoard
