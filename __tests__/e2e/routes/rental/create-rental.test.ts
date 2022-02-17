import supertest from 'supertest'

import { Application, IApplicationResponse } from '../../support/application.support'

describe('POST - create a rental', () => {
  const path = '/api/v1/rental'

  let dependecies: IApplicationResponse

  beforeAll(async () => {
    dependecies = await Application.start()
  })

  afterAll(async () => {
    await dependecies.end()
  })

  it('should throw "bad request" when request without request body', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({})

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "nome" field', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 1000,
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }]
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid cnpj field', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: 'invalid-cnpj',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }]
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "atividades" field', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 1000,
        endereco: [{
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }]
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with "endereco" field without child', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: []
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "endereco.cep" field', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: 'invalid cep',
          number: '1234',
          isFilial: false
        }]
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "endereco.number" field', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: false,
          isFilial: false
        }]
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "endereco.isFilial" field', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: '2283',
          isFilial: 'invalid option'
        }]
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with two or more isFilial equal false', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '96200-200',
            number: '2283',
            isFilial: false
          },
          {
            cep: '96200-200',
            number: '2283',
            isFilial: false
          }
        ]
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "ok" when request with correct request body', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '96200-200',
            number: '2283',
            isFilial: false
          },
          {
            cep: '96200-200',
            number: '2283',
            isFilial: true
          }
        ]
      })

    expect(res.statusCode).toBe(201)
  })
})
