export function clearObject <T> (obj: any): T {
  const result: any = {}

  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== '') {
      result[key] = obj[key]
    } else if (typeof obj[key] === 'object') {
      result[key] = clearObject(obj[key])
    }
  })

  return result
}
