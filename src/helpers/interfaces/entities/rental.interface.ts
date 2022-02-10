export interface IRental {
  _id: string
  nome: string
  cnpj: string
  atividades: string
  endereco: {
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    number: string
    complemento?: string
    isFilial: boolean
  }
}

export interface IRentalDTO extends Omit<IRental, 'endereco'> {
  endereco: {
    cep: string
    number: string
    complemento?: string
    isFilial: boolean
  }
}
