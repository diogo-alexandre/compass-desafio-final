import 'dotenv/config'

export function env (key: string): string | undefined {
  return process.env[key]
}
