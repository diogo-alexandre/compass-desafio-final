import { IPeople, IPeopleDTO } from '../../helpers/interfaces/entities/people.interface'

export interface IPeopleRepository {
  create: (people: IPeopleDTO) => Promise<IPeople>
  findByEmail: (email: string) => Promise<IPeople | null>
}
