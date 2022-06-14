import { keyBy, schedulingBy } from '@elzup/kit'
import { Typography } from '@mui/material'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { BlockLine, Koyomi } from '../../types'
import { mapId } from '../../utils'
import {
  endTimeNum,
  getRangeKoyomi,
  makeMeasure,
  timeNum,
} from '../../utils/koyomi'
import { useKoyomiDraw } from './useKoyomiDraw'

type Props = {
  koyomis: Koyomi[]
}

function KoyomiBoard({ koyomis }: Props) {
  const { blocks, measures } = useMemo(() => {
    const blocks: BlockLine[] = koyomis.map((koyomi) => ({
      koyomi,
      lines: schedulingBy(mapId(koyomi.times), ({ id, ...v }) => ({
        id,
        start: timeNum(v.time),
        end: endTimeNum(v),
      })).map((v) => keyBy(v, (v) => String(timeNum(v.time)))),
    }))
    const range = getRangeKoyomi(koyomis)

    return { blocks, measures: makeMeasure(range.bgn, range.end) }
  }, [koyomis])
  const png = useKoyomiDraw(blocks, measures)

  return (
    <Style>
      {png !== null && <img src={png} />}
      {blocks.map(({ koyomi, lines }) => (
        <div key={koyomi.id}>
          <Typography>{koyomi.title}</Typography>

          <div className="tl">
            {lines.map((cells, ci) => (
              <div key={ci} className="line">
                {measures
                  .map((pos) => ({ pos, cell: cells[pos.id] }))
                  .map(({ pos, cell }) => (
                    <div
                      key={pos.id}
                      className="cell"
                      data-y={pos.ym.y}
                      data-m={pos.ym.m}
                    >
                      {cell?.label}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Style>
  )
}
const Style = styled.div`
  .tl {
    .line {
      display: flex;
    }

    .cell {
      width: 30px;
      height: 30px;
      border: solid 1px #ccc;
    }
  }
`

export default KoyomiBoard
