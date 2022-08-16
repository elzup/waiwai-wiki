import { groupByFunc, keyBy, schedulingEaseBy } from '@elzup/kit'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { BlockLine, Koyomi, LineMemory } from '../../types'
import {
  calcEndMi,
  calcLayoutX,
  calcLayoutY,
  calcStartMi,
  getRangeKoyomi,
  graphConfig,
  makeMeasure,
  toYmNum,
} from '../../utils/koyomi'
import { KoyomiItem } from './KoyomiItem'

const { CELL_W: CW, CELL_H: CH } = graphConfig

type GraphProps = {
  rows: number
  cols: number
}

const useGraph = (koyomis: Koyomi[]) => {
  return useMemo(() => {
    const range = getRangeKoyomi(koyomis)
    const measures = makeMeasure(range.bgn, range.end)

    const blocks: BlockLine[] = koyomis.map((koyomi) => {
      const preMemories: LineMemory[] = koyomi.memories.map((v, i) => {
        const startMi = calcStartMi(v.time)
        const endMi = calcEndMi(v, range.end + 1)

        return {
          ...v,
          id: String(i),
          startMi,
          endMi,
          range: endMi - startMi + 1,
        }
      })

      return {
        koyomi,
        lines: schedulingEaseBy(
          preMemories,
          ({ id, startMi: start, endMi: end }) => ({
            id,
            start,
            end: Math.max(end, Number(start) + 3),
          })
        ).map((v) => keyBy(v, (v) => String(toYmNum(v.time)))),
      }
    })

    const graph: GraphProps = {
      cols: measures.length,
      rows: blocks.map((v) => v.lines.length).reduce((a, b) => a + b),
    }
    const poslibY = calcLayoutY(blocks)
    const poslibX = calcLayoutX(measures)

    return { blocks, measures, graph, poslibY, poslibX }
  }, [koyomis])
}

type Props = {
  koyomis: Koyomi[]
}

function KoyomiBoard({ koyomis }: Props) {
  const { blocks, measures, graph, poslibY, poslibX } = useGraph(koyomis)
  const [size, setSize] = useState<'s' | 'm' | 'l'>('s')
  const years = Object.entries(groupByFunc(measures, (v) => String(v.ym.y)))

  return (
    <Style data-size={size}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">size</FormLabel>
        <RadioGroup
          row
          defaultValue={size}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(v) => setSize(v.target.value as 's' | 'm' | 'l')}
        >
          <FormControlLabel value="s" control={<Radio />} label="S" />
          <FormControlLabel value="m" control={<Radio />} label="M" />
          <FormControlLabel value="l" control={<Radio />} label="L" />
        </RadioGroup>
      </FormControl>
      <div className="draw">
        <div className="draw-part head">
          {years.map(([y, v]) => (
            <div key={y} className="y" style={{ width: `${CW * v.length}px` }}>
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
            <div key={y} className="y" style={{ width: `${CW * v.length}px` }}>
              <div className="m">
                {v.map((m) => (
                  <div key={m.id} className="m-cell">
                    <div
                      className="body"
                      style={{ height: `${CH * graph.rows}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {blocks.map(({ koyomi, lines }, bi) => (
            <div key={koyomi.id}>
              <Typography>{koyomi.title}</Typography>

              <div className="tl">
                {lines.map((memories, ci) => (
                  <div key={ci} className="line">
                    {measures
                      .map((pos) => ({
                        pos,
                        memory: memories[pos.id],
                        y: poslibY[`${bi}-${ci}`],
                        x: poslibX[pos.id],
                      }))
                      .filter(({ memory }) => Boolean(memory))
                      .map(({ pos, memory, y, x }) => (
                        <div
                          key={pos.id}
                          className="cell"
                          style={{ left: `${x}px`, top: `${y}px` }}
                        >
                          <KoyomiItem memory={memory} />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  &[data-size='s'] {
    .draw {
      transform: scale(0.5);
    }
  }
  &[data-size='m'] {
    .draw {
      transform: scale(0.8);
    }
  }
  .draw {
    transform-origin: left top;
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
      background: white;
    }
  }
`

export default KoyomiBoard
