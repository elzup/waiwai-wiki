import { Attr, Game, Item, Time, Timeline } from '../types'

export const game: Game = {
  id: 'splatoon2',
  title: 'Splatoon 2',
  icon: '',
}

const attrWepon: Attr = {
  id: 'wepon',
  name: 'ブキ',
  gameId: game.id,
}

export const attrs: Attr[] = [
  attrWepon,
  {
    id: 'stage',
    name: 'ステージ',
    gameId: game.id,
  },
]

export const items: Item[] = [
  {
    id: 'i01',
    attrId: attrWepon.id,
    name: 'スプラシューター',
  },
  {
    id: 'i02',
    attrId: attrWepon.id,
    name: 'H3リールガン',
  },
  {
    id: 'i02',
    attrId: attrWepon.id,
    name: 'H3リールガン',
  },
]

export const timeline: Timeline = {
  id: 'tl-0001',
  userId: 'anozon',
  title: 'Splatoon2 使用ブキ',
  times: [
    {
      category: 'point',
      itemId: null,
      time: '2000-01-01',
    },
    {
      category: 'point',
      itemId: null,
      time: '2000-01-01',
    },
  ],
  attrs: [],
}
