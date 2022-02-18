export class InvalidCNPJ extends Error {
  constructor (msg: string = 'CNPJ is not valid') {
    super(msg)

    this.name = 'Invalid CNPJ'
  }
}
