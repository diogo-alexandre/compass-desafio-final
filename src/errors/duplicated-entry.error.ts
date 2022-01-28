export class DuplicatedEntry extends Error {
  constructor (msg: string) {
    super(msg)

    this.name = 'Duplicated Entry'
  }
}
