import supertest from 'supertest'
import { Application, IApplicationResponse } from '../support/application.support'

describe('Feature test endpoint PEOPLE', () => {
  const path = '/api/v1/people'

  let dependecies: IApplicationResponse

  beforeAll(async () => {
    dependecies = await Application.start()
  })

  afterAll(async () => {
    await dependecies.end()
  })

  describe('POST - create a user', () => {
    it('should throw "bad request" when request without body request', async () => {
      const res = await supertest(dependecies.app).post(path).send({})

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request without required field', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        cpf: '86416348004',
        data_nascimento: '23/02/2002',
        email: 'valid-email@gmail.com',
        senha: 'valid-password',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "cpf" field', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: 'invalid-cpf-field',
        data_nascimento: '23/02/2002',
        email: 'valid-email@gmail.com',
        senha: 'valid-password',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "data_nascimento" field', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: '86416348004',
        data_nascimento: 'invalid-date',
        email: 'valid-email@gmail.com',
        senha: 'valid-password',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "data_nascimento" date format field', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: '86416348004',
        data_nascimento: '2002/02/23',
        email: 'valid-email@gmail.com',
        senha: 'valid-password',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "email" field', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: '86416348004',
        data_nascimento: '23/02/2002',
        email: 'invalid-email',
        senha: 'valid-password',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "senha" field', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: '86416348004',
        data_nascimento: '23/02/2002',
        email: 'valid-email@mail.com',
        senha: 'inval',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "habilitado" field', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: '86416348004',
        data_nascimento: '23/02/2002',
        email: 'valid-email@mail.com',
        senha: 'valid-password',
        habilitado: 'invalid-option'
      })

      expect(res.statusCode).toBe(400)
    })

    it('should throw "conflict" when request with fields that already exists on app', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: '68206259015',
        data_nascimento: '23/02/2002',
        email: 'other-valid-email@mail.com',
        senha: 'valid-password',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(409)
    })

    it('should throw "OK" when request with request body correctly', async () => {
      const res = await supertest(dependecies.app).post(path).send({
        nome: 'valid-name',
        cpf: '86416348004',
        data_nascimento: '23/02/2002',
        email: 'valid-email@mail.com',
        senha: 'valid-password',
        habilitado: 'sim'
      })

      expect(res.statusCode).toBe(201)
    })
  })
})
