import { isRegExp } from 'util/types'

export function clearObject <T> (obj: any): T {
  const result: any = {}

  Object.keys(obj).forEach(key => {
    if (!(isNaN(obj[key]) && typeof obj[key] === 'number')) {
      if (obj[key] !== undefined && obj[key] !== '') {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && !isRegExp(obj[key]) && !(obj[key] instanceof Date)) {
          const r = clearObject<any>(obj[key])

          if (Object.keys(r).length > 0) {
            result[key] = r
          }
        } else {
          result[key] = obj[key]
        }
      }
    }
  })

  return result
}
