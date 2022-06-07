import { Attr, Game, Item, Timeline } from '../types'
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

export const timeline: Timeline = {
  id: 'tl-0001',
  userId: 'anozon',
  title: 'Splatoon2 使用ブキ',
  times: [
    {
      category: 'point',
      itemId: null,
      label: '初プレイ',
      time: '2017-08-01',
    },
    {
      category: 'range',
      itemId: 'N-ZAP85',
      label: 'N-ZAP85',
      time: '2017-08-01',
    },
    {
      category: 'range',
      itemId: 'ジェトスイーパー',
      label: 'ジェトスイーパー',
      time: '2018-01-01',
      end: '2018-01-01',
    },
    {
      category: 'point',
      itemId: null,
      label: '全部3.9ギア揃える',
      time: '2018-02-01',
    },
    {
      category: 'range',
      itemId: 'クアッドホッパーブラック',
      label: 'クアッドホッパーブラック',
      time: '2018-03-01',
      end: '2018-04-01',
    },
    {
      category: 'point',
      itemId: null,
      label: 'ウデマエX到達',
      time: '2018-04-01',
    },
    {
      category: 'point',
      itemId: null,
      label: 'ランク99',
      time: '2018-05-01',
    },
    {
      category: 'point',
      itemId: null,
      label: 'オクトクリア',
      time: '2018-06-01',
    },
    {
      category: 'range',
      itemId: 'プライムシューター',
      label: 'プライムシューター',
      time: '2018-06-01',
      end: '2018-06-01',
    },
    {
      category: 'point',
      itemId: null,
      label: 'シャケ999カンスト',
      time: '2018-07-01',
    },
    {
      category: 'range',
      itemId: 'ジェトスイーパー',
      label: 'ジェトスイーパー',
      time: '2018-07-01',
      end: '2018-07-01',
    },
    {
      category: 'range',
      itemId: 'H3リールガン',
      label: 'H3リールガン',
      time: '2018-08-01',
    },
    {
      category: 'range',
      itemId: 'わかばシューター',
      label: 'わかばシューター',
      time: '2019-04-01',
    },
    {
      category: 'point',
      itemId: null,
      label: 'XP2500到達',
      time: '2019-06-01',
    },
    {
      category: 'range',
      itemId: 'ジェトスイーパー',
      label: 'ジェトスイーパー',
      time: '2019-07-01',
    },
    {
      category: 'point',
      itemId: null,
      label: '王冠',
      time: '2020-04-01',
    },
    {
      category: 'range',
      itemId: '96ガロン',
      label: '96ガロン',
      time: '2022-01-01',
      end: '2022-01-01',
    },
    {
      category: 'range',
      itemId: 'ラピットブラスター',
      label: 'ラピットブラスター',
      time: '2022-06-01',
    },
  ],
  attrs: [],
}
