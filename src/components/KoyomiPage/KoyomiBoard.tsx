import { groupByFunc, keyBy, schedulingBy } from '@elzup/kit'
import { Typography } from '@mui/material'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { BlockLine, Koyomi } from '../../types'
import { mapId } from '../../utils'
import {
  calcLayoutX,
  calcLayoutY,
  endTimeNum,
  getRangeKoyomi,
  makeMeasure,
  timeNum,
  graphConfig,
} from '../../utils/koyomi'
import { useKoyomiDraw } from './useKoyomiDraw'

const { CELL_W: CW, CELL_H: CH } = graphConfig

type GraphProps = {
  rows: number
  cols: number
}

type Props = {
  koyomis: Koyomi[]
}

function KoyomiBoard({ koyomis }: Props) {
  const { blocks, measures, graph } = useMemo(() => {
    const blocks: BlockLine[] = koyomis.map((koyomi) => ({
      koyomi,
      lines: schedulingBy(mapId(koyomi.times), ({ id, ...v }) => ({
        id,
        start: timeNum(v.time),
        end: endTimeNum(v),
      })).map((v) => keyBy(v, (v) => String(timeNum(v.time)))),
    }))
    const range = getRangeKoyomi(koyomis)

    const measures = makeMeasure(range.bgn, range.end)
    const graph: GraphProps = {
      cols: measures.length,
      rows: blocks.map((v) => v.lines.length).reduce((a, b) => a + b),
    }

    return { blocks, measures, graph }
  }, [koyomis])
  const png = useKoyomiDraw(blocks, measures)
  const years = Object.entries(groupByFunc(measures, (v) => String(v.ym.y)))

  const poslibY = calcLayoutY(blocks)
  const poslibX = calcLayoutX(measures)

  return (
    <Style>
      <div className="draw">
        <div className="draw-part head">
          {years.map(([y, v]) => (
            <div key={y} className="y">
              <div className="y-head">{y}</div>
              <div className="m">
                {v.map((m) => (
                  <div key={m.id} className="m-cell">
                    <div className="m-head">{m.ym.m}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="draw-part body">
          {years.map(([y, v]) => (
            <div key={y} className="y">
              <div className="m">
                {v.map((m) => (
                  <div key={m.id} className="m-cell">
                    <div
                      className="body"
                      style={{ height: `${CH * graph.rows}px` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {blocks.map(({ koyomi, lines }, bi) => (
            <div key={koyomi.id}>
              <Typography>{koyomi.title}</Typography>

              <div className="tl">
                {lines.map((cells, ci) => (
                  <div key={ci} className="line">
                    {measures
                      .map((pos) => ({
                        pos,
                        cell: cells[pos.id],
                        y: poslibY[`${bi}-${ci}`],
                        x: poslibX[pos.id],
                      }))
                      .filter(({ cell }) => Boolean(cell))
                      .map(({ pos, cell, y, x }) => (
                        <div
                          key={pos.id}
                          className="cell"
                          style={{ left: `${x}px`, top: `${y}px` }}
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
        </div>
      </div>
      <div>{png !== null && <img src={png} />}</div>
    </Style>
  )
}

const Style = styled.div`
  .draw {
  }

  box-sizing: border-box;

  .draw-part {
    display: grid;
    grid-auto-flow: column;
    .y {
      border: solid 1px #666;
      &:not(:first-child) {
        border-left-width: 0;
      }
      .y-head {
        padding-left: 4px;
      }
    }
    .m {
      display: grid;
      grid-auto-flow: column;
      text-align: center;
      .m-cell {
        width: ${CW}px;
        border: solid 1px #aaa;
        border-bottom-width: 0;
        border-left-width: 0;
        &:last-child {
          border-right-width: 0;
        }
      }
    }
    &.head {
      .y {
        border-bottom-width: 0;
      }
    }
    &.body {
      position: relative;
      .y {
        border-top-width: 0;
      }
      .cell {
        position: absolute;
      }
    }
  }

  .koyomi {
    position: absolute;
    display: none;
  }
  .tl {
    font-family: 'Noto Sans JP', sans-serif;
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
