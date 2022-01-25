import { env } from '../utils/env.util'

export const config = {
  uri: env('DB_URI'),
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
