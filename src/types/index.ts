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

export type TimeKey = string // 2000-01-00

export type TimeBase = {
  itemId: Id | null
  label: string | null
  time: TimeKey
}

export type TimePoint = TimeBase & {
  category: 'point'
}

export type TimeRange = TimeBase & {
  category: 'range'
  end?: TimeKey
}

export type Time = TimePoint | TimeRange
export type TimeRaw = Omit<Time, 'id'>

export type Koyomi = {
  id: Id
  userId: Id
  title: string
  times: Time[]
  attrs: Id[]
}
