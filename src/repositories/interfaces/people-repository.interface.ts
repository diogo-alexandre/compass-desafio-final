import { IPeople, IPeopleDTO } from '../../helpers/interfaces/people.interface'

export interface IPeopleRepository {
  create: (people: IPeople) => Promise<IPeopleDTO>
  findByEmail: (email: string) => Promise<IPeopleDTO | null>
}
