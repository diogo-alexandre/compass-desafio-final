enum Color {
  RESET = '\x1b[0m',
  BRIGHT = '\x1b[1m',

  RED = '\x1b[31m',
  CYAN = '\x1b[36m',
  BLACK = '\x1b[30m'
}

function base (type: string, color: Color | string, message: string): void {
  const now = new Date().toTimeString().split(' ')[0]
  const time = `${Color.BRIGHT}${Color.BLACK}${now}${Color.RESET}`

  type = `[${color}${type.toLocaleUpperCase()}${Color.RESET}]`

  console.log(`${type} ${time} ${message}`)
}

export const Log = {
  info (message: string) {
    base('info', Color.CYAN, message)
  }
}
