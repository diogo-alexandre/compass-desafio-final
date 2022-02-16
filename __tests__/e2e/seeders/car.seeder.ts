import { ICar } from '../../../src/helpers/interfaces/entities/car.interface'
import { Car } from '../../../src/schemas/car.schema'

export const CarSeeder = {
  handle: async (): Promise<ICar[]> => {
    return [
      await Car.create({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
      }),
      await Car.create({
        modelo: 'VW GOL 1.0',
        cor: 'branco',
        ano: '2015',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
      }),
      await Car.create({
        modelo: 'VW Fusca',
        cor: 'azul',
        ano: '1950',
        acessorios: [{ descricao: 'Funciona de baixo d\'agua' }],
        quantidadePassageiros: 5
      }),
      await Car.create({
        modelo: 'VW Combi',
        cor: 'preto',
        ano: '1950',
        acessorios: [{ descricao: 'Espaçoso' }],
        quantidadePassageiros: 8
      })
    ]
  }
}
