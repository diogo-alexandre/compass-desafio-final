import { ICar } from '../../../../src/helpers/interfaces/entities/car.interface'
import { IPeople } from '../../../../src/helpers/interfaces/entities/people.interface'
import { IRental } from '../../../../src/helpers/interfaces/entities/rental.interface'

export interface IEntities {
  people: IPeople[]
  car: ICar[]
  rental: IRental[]
}
