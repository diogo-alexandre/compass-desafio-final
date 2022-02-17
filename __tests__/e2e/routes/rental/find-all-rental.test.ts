import supertest from 'supertest'

import { Application, IApplicationResponse } from '../../support/application.support'

describe('GET - find all rentals', () => {
  const path = '/api/v1/rental'

  let dependecies: IApplicationResponse

  beforeAll(async () => {
    dependecies = await Application.start()
  })

  afterAll(async () => {
    await dependecies.end()
  })

  it('should sucess when request with no request body', async () => {
    const res = await supertest(dependecies.app)
      .get(path)

    expect(res.statusCode).toBe(200)
  })

  it('should throw "bad request" when request with empty "nome" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path).query({
        nome: ''
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "cnpj" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        cnpj: 'invalid-field'
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with empty "atividades" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        atividades: ''
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "limit" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 'invalid-field'
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with "limit" field smaller than 1', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 0
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with invalid "offset" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        offset: 'invalid-field'
      })

    expect(res.statusCode).toBe(400)
  })

  it('should throw "bad request" when request with "offset" field smaller than 1', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        offset: 0
      })

    expect(res.statusCode).toBe(400)
  })

  it('should pagination "limit" work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 1
      })

    expect(res.body.limit).toBe(1)
    expect(res.body.rentals.length).toBe(1)
  })

  it('should pagination "offset" work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 1,
        offset: 1
      })

    expect(res.body.offset).toBe(2)
  })
})
