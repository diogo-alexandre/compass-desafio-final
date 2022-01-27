import { isRegExp } from 'util/types'

export function clearObject <T> (obj: any): T {
  const result: any = {}

  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== '') {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && !isRegExp(obj[key])) {
        const r = clearObject<any>(obj[key])

        if (Object.keys(r).length > 0) {
          result[key] = r
        }
      } else {
        result[key] = obj[key]
      }
    }
  })

  return result
}
