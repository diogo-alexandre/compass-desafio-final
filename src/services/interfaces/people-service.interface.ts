import { IPeople, IPeopleDTO } from '../../helpers/interfaces/people.interface'

export interface IPeopleService {
  create: (people: IPeopleDTO) => Promise<IPeople>
}
