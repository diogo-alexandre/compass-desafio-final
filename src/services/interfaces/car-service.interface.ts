import { IAcessorioDTO } from '../../helpers/interfaces/entities/acessorio.interface'
import { ICar, ICarDTO } from '../../helpers/interfaces/entities/car.interface'
import { IPaginateResult } from '../../helpers/interfaces/paginate.interface'

export interface ICarService {
  create: (car: ICarDTO) => Promise<ICarDTO>
  findAll: (query: Partial<ICarDTO>, limit: number, offset: number) => Promise<IPaginateResult<ICar>>
  findById: (id: string) => Promise<ICar>
  delete: (id: string) => Promise<ICar>
  update: (id: string, car: ICarDTO) => Promise<ICar>
  updateAcessorio: (carId: string, acessorioId: string, payload: IAcessorioDTO) => Promise<ICar>
}
