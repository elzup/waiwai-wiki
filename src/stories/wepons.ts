import { weponTsv } from './weponSeedData'

const uniq = <T>(arr: T[]) => [...new Set(arr)]

export const wepons = weponTsv
  .split('\n')
  .map((line) => line.split('\t'))
  .map(([name, cate3, cate2, cate1, sub, sp, range, power, rapid]) => ({
    name,
    cate3,
    cate2,
    cate1,
    sub,
    sp,
    range,
    power,
    rapid,
  }))

const _genIds = (names: string[]) => {
  const lib: Record<string, string> = {}
  const byName: Record<string, string> = {}

  names.forEach((name) => {
    const id = name // いったん全角ID

    lib[id] = name
    byName[name] = id
  })

  return { lib, byName }
}

export const subs = uniq(wepons.map((v) => v.sub))
export const cates = uniq(wepons.map((v) => v.cate2))
export const baseWepons = uniq(wepons.map((v) => v.cate3))
export const sps = uniq(wepons.map((v) => v.sp))
