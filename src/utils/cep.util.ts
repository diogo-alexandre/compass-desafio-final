import axios from 'axios'

import { IAdress } from '../helpers/interfaces/entities/adress.interface'

export const CEP = {
  getAdress: async (cep: string): Promise<Omit<IAdress, 'number'>> => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
    const { logradouro, bairro, localidade, uf } = response.data

    return {
      cep,
      logradouro,
      bairro,
      localidade,
      uf
    }
  }
}
