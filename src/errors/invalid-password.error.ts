export class InvalidPasswordError extends Error {
  constructor (msg: string) {
    super(msg)

    this.name = 'Invalid Password Error'
  }
}
