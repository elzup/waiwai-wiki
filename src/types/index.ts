export type Map = {
  resourceId: string
}
export type Game = {
  id: string
  title: string
  icon?: string
}
export type Strategy = {}

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
export type Item = {
  id: Id
  name: string
  url: string
}

export type User = {
  id: string
}

export type Maching = {}

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

export type TimePoint = {
  id: Id
  time: TimeKey
  category: 'point'
}

export type TimeKey = string // 2000-01-00
export type TimeRange = {
  id: Id
  start: TimeKey
  end: TimeKey
}
export type Time = TimePoint | TimeRange

export type Timeline = {
  id: Id
  userId: Id
  title: string
  times: Time[]
  attrs: Id[]
}

// Timeline instance

export type Attr = {
  id: Id
  naem: Id
  gameId: Id
}
