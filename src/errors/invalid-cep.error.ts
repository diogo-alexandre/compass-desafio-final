export class InvalidCEP extends Error {
  constructor (msg: string = 'CEP is not valid') {
    super(msg)

    this.name = 'Invalid CEP'
  }
}
