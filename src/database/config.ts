import { RuntimeError } from '../errors/runtime.error'
import { env } from '../utils/env.util'

export const config = {
  uri: (() => {
    const r = env('DB_URI')

    if (r === undefined) {
      throw new RuntimeError('env "DB_URI" was not providaded.')
    }

    return r
  })(),
  hidden (uri: string): string {
    const [drive, rest] = uri.split('://')

    console.log(rest)
    let auth = ''
    let host

    if (uri.includes('@')) {
      [auth, host] = rest.split('@')
    } else {
      host = rest
    }

    return `${drive}://${(auth !== '') ? '***:***@' : ''}${host}`
  }
}
