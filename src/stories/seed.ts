import { Attr, Game, Item, Koyomi } from '../types'
import { wepons, subs, cates, sps } from './wepons'

export const game: Game = {
  id: 'splatoon2',
  title: 'Splatoon 2',
  icon: '',
}
const gameId = game.id

export const attrCate: Attr = { id: 'category', name: 'ブキカテゴリ', gameId }
export const attrWepon: Attr = { id: 'wepon', name: 'ブキ', gameId }
export const attrSubWepon: Attr = { id: 'sub', name: 'サブウェポン', gameId }
export const attrSp: Attr = { id: 'sp', name: 'スペシャル', gameId }
export const attrStage = { id: 'stage', name: 'ステージ', gameId }

export const itesmsCate: Item[] = cates.map((name) => ({
  id: name,
  attrId: attrCate.id,
  name,
}))

export const itesmsSub: Item[] = subs.map((name) => ({
  id: name,
  attrId: attrSubWepon.id,
  name,
}))

export const itesmsSp: Item[] = sps.map((name) => ({
  id: name,
  attrId: attrSp.id,
  name,
}))

export const itemsWepon: Item[] = wepons.map((wepon) => {
  return {
    id: wepon.name,
    name: wepon.name,
    attrId: attrWepon.id,
    fields: {
      [attrSubWepon.id]: wepon.sub,
      [attrSp.id]: wepon.sp,
      [attrCate.id]: wepon.cate2,
      [attrWepon.id]: wepon.cate3,
    },
  }
})

export const attrs: Attr[] = [
  attrCate,
  attrWepon,
  attrSubWepon,
  attrSp,
  attrStage,
]

const ep = { category: 'point', itemId: null } as const

export const koyomiWepon: Koyomi = {
  id: 'tl-anozon-0001',
  userId: 'anozon',
  title: 'Splatoon2 使用ブキ',
  memories: [
    {
      category: 'range',
      itemId: 'N-ZAP85',
      label: 'N-ZAP85',
      time: '2017-08',
    },
    {
      category: 'range',
      itemId: 'ジェトスイーパー',
      label: 'ジェトスイーパー',
      time: '2018-01',
      end: '2018-01',
    },
    {
      category: 'range',
      itemId: 'クアッドホッパーブラック',
      label: 'クアッドホッパーブラック',
      time: '2018-03',
      end: '2018-04',
    },
    {
      category: 'range',
      itemId: 'プライムシューター',
      label: 'プライムシューター',
      time: '2018-06',
      end: '2018-06',
    },
    {
      category: 'range',
      itemId: 'ジェトスイーパー',
      label: 'ジェトスイーパー',
      time: '2018-07',
      end: '2018-07',
    },
    {
      category: 'range',
      itemId: 'H3リールガン',
      label: 'H3リールガン',
      time: '2018-08',
    },
    {
      category: 'range',
      itemId: 'わかばシューター',
      label: 'わかばシューター',
      time: '2019-04',
    },
    {
      category: 'range',
      itemId: 'ジェトスイーパー',
      label: 'ジェトスイーパー',
      time: '2019-07',
    },
    {
      category: 'range',
      itemId: '96ガロン',
      label: '96ガロン',
      time: '2022-01',
      end: '2022-01',
    },
    {
      category: 'range',
      itemId: 'ラピットブラスター',
      label: 'ラピットブラスター',
      time: '2022-06',
    },
  ],
  attrs: [],
}

export const koyomiAchive: Koyomi = {
  id: 'tl-anozon-0002',
  userId: 'anozon',
  title: 'Splatoon2 実績',
  memories: [
    { ...ep, label: '初プレイ', time: '2017-08' },
    { ...ep, label: '3.9ギアコンプ', time: '2018-02' },
    { ...ep, label: 'ウデマエX到達', time: '2018-04' },
    { ...ep, label: 'ランク99', time: '2018-05' },
    { ...ep, label: 'オクトクリア', time: '2018-06' },
    { ...ep, label: 'サモランカンスト999', time: '2018-07' },
    { ...ep, label: 'XP2500到達', time: '2019-06' },
    { ...ep, label: 'アサリ王冠', time: '2020-04' },
    { ...ep, category: 'range', label: '休', time: '2020-06', end: '2021-10' },
  ],
  attrs: [],
}
