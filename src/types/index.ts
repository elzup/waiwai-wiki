export type LoginInfo =
  | {
      status: 'loading'
    }
  | {
      status: 'none'
    }
  | {
      status: 'auth'
      uid: string
    }
  | {
      status: 'comp'
      uid: string
      user: User
    }

const PROVIDER_TYPE_GOOGLE = 'google'
const PROVIDER_TYPE_TWITTER = 'twitter'
const PROVIDER_TYPES = [PROVIDER_TYPE_GOOGLE, PROVIDER_TYPE_TWITTER] as const

export type ProviderType = typeof PROVIDER_TYPES[number]

type Id = string

export type Map = {
  resourceId: string
}
export type Game = {
  id: string
  title: string
  icon?: string
}
export type Strategy = {}

export type Attr = {
  id: Id
  gameId: Id
  name: string
}

export type Item = {
  id: Id
  attrId: Id
  name: string
  notes?: { [name: string]: string }
  fields?: { [attrId: Id]: Id }
  icon?: string
}

export type User = {
  id: string
}

export type Maching = {
  title: string
  attrs: [Id, Id]
}

export type Table = {
  id: Id
  mirror: boolean
  templateR: Id
  templateV: Id
  cells: Cell[][]
}

export type Cell = {
  category: 'emp' | 'val' | 'non' | 'ox'
  val: number
  str: string
}

export type YmNum = number // 202211
export type YmKey = string // 2022-11-00

export type MemoryBase = {
  itemId: Id | null
  label: string | null
  time: YmKey
}

export type MemoryPoint = MemoryBase & {
  category: 'point'
}

export type MemoryRange = MemoryBase & {
  category: 'range'
  end?: YmKey
}

export type Memory = MemoryPoint | MemoryRange
export type MemoryRaw = Omit<Memory, 'id'>

export type Koyomi = {
  id: Id
  userId: Id
  title: string
  memories: Memory[]
  attrs: Id[]
}

export type Ym = { y: number; m: number }
export type TimeGrid = { n: number; ym: Ym; id: YmNum }

export type LineAttrs = {
  id: string
  startMi: YmNum
  endMi: YmNum
  range: number
}
export type LineMemoryRange = MemoryRange & LineAttrs
export type LineMemoryPoint = MemoryPoint & LineAttrs
export type LineMemory = LineMemoryRange | LineMemoryPoint
export type Line = Record<string, LineMemory>
export type BlockLine = { koyomi: Koyomi; lines: Line[] }
