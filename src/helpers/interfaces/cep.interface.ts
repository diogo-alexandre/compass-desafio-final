import { IAdress } from './entities/adress.interface'

export type ICEP = (cep: string) => {
  toStringPlain: () => string
  toStringWithDots: () => string
  getAdress: () => Promise<Omit<IAdress, 'number'>>
}
