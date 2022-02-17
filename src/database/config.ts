import { Env } from '../utils/env.util'

export const config = {
  uri: Env.get<string>('DB_URI'),
  hidden (uri: string): string {
    const [drive, rest] = uri.split('://')

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
