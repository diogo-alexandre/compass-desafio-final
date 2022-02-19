import axios from 'axios'

import { InvalidCEP } from '../errors/invalid-cep.error'
import { ICEP } from '../helpers/interfaces/cep.interface'
import { IAdress } from '../helpers/interfaces/entities/adress.interface'

export const CEP: ICEP = (cep: string) => {
  const regex = /^([0-9]{5})[-]?([0-9]{3})$/

  if (!regex.test(cep)) {
    throw new InvalidCEP(`CEP ${cep} is not valid`)
  }

  return {
    toStringPlain: () => cep.replace(regex, '$1$2'),
    toStringWithDots: () => cep.replace(regex, '$1-$2'),
    getAdress: async (): Promise<Omit<IAdress, 'number'>> => {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)

      if (response.data.erro === true) {
        throw new InvalidCEP(`CEP ${cep} is not valid`)
      }

      const { cep: cepWithDots, logradouro, bairro, localidade, uf } = response.data

      return {
        cep: cepWithDots,
        logradouro,
        bairro,
        localidade,
        uf
      }
    }
  }
}
