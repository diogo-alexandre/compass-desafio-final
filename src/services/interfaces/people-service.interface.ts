import { IPeople, IPeopleDTO } from '../../helpers/interfaces/entities/people.interface';

export interface IPeopleService {
  create: (people: IPeopleDTO) => Promise<IPeople>
  findByEmail: (email: string) => Promise<IPeople>
}
