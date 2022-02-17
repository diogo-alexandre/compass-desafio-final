import 'dotenv/config'

import { RuntimeError } from '../errors/runtime.error'

const variables: any = {}

export const Env = {
  get <T> (key: string): T | string {
    key = key.toUpperCase()

    const value = variables[key] ?? process.env[key]

    if (value === undefined) {
      throw new RuntimeError(`env "${key}" was not defined`)
    }

    return value
  },
  set <T> (key: string, value: T): void {
    key = key.toUpperCase()
    variables[key] = value
  }
}
