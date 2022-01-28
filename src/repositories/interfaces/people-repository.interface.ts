import { IPeople } from '../../helpers/interfaces/people.interface'

export interface IPeopleRepository {
  create: (people: IPeople) => Promise<IPeople>
}
