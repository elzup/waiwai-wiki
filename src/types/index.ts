export type Map = {
  resourceId: string
}
export type Game = {
  id: string
  title: string
  icon?: string
}
export type Strategy = {}

export type User = {
  id: string
}

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
