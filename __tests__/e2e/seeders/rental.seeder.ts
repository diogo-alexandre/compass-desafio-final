import { IRental } from '../../../src/helpers/interfaces/entities/rental.interface'
import { RentalRepository } from '../../../src/repositories/rental.repository'
import { RentalService } from '../../../src/services/rental.service'

export const RentalSeeder = {
  handle: async (): Promise<IRental[]> => {
    const rentalRepository = new RentalRepository()
    const rentalService = new RentalService(rentalRepository)

    return [
      await rentalService.create({
        nome: 'Localiza Rent a Car',
        cnpj: '16.670.085/0001-55',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '52021-000',
            number: '1234',
            isFilial: false
          }
        ]
      }),
      await rentalService.create({
        nome: 'Localiza Rent a Car',
        cnpj: '94.153.779/0001-29',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '96200-200',
            number: '1234',
            isFilial: false
          },
          {
            cep: '96200-500',
            number: '5678',
            complemento: 'Muro A',
            isFilial: true
          }
        ]
      }),
      await rentalService.create({
        nome: 'TO DELETE ENTITY',
        cnpj: '07.092.289/0001-65',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '96200-200',
            number: '1234',
            isFilial: false
          }
        ]
      })
    ]
  }
}
