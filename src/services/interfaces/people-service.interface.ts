import { IPeople, IPeopleDTO } from '../../helpers/interfaces/people.interface'

export interface IPeopleService {
  create: (people: IPeople) => Promise<IPeopleDTO>
  findByEmail: (email: string) => Promise<IPeopleDTO>
}
