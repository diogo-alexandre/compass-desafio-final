import { ICarDTO } from '../../../src/helpers/interfaces/car.interface'
import { Car } from '../../../src/schemas/car.schema'

export const CarSeeder = {
  handle: async (): Promise<ICarDTO[]> => {
    const entities: ICarDTO[] = []

    entities.push(await Car.create({
      modelo: 'GM S10 2.8',
      cor: 'branco',
      ano: '2021',
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    }))

    return entities
  }
}
