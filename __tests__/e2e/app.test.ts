import mongoose from 'mongoose'
import supertest from 'supertest'
import { Express } from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { App } from '../../src/App'
import { PeopleSeeder } from './seeders/people.seeder'
import { CarSeeder } from './seeders/car.seeder'
import { ICar } from '../../src/helpers/interfaces/entities/car.interface'

describe('Feature Test', () => {
  let mongod: MongoMemoryServer
  let app: Express

  let carEntities: Array<Omit<ICar, '_id'> & { _id: string }>

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    app = await App.init({
      db_uri: mongod.getUri() + 'e2e'
    })

    await PeopleSeeder.handle()
    carEntities = await CarSeeder.handle() as any
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  })

  describe('/api/v1/authenticate', () => {
    const prefix = '/api/v1/authenticate'

    describe('POST - login', () => {
      it('should throw "bad request" when request without body request', async () => {
        const res = await supertest(app).post(prefix)

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request without email', async () => {
        const res = await supertest(app).post(prefix).send({
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid email', async () => {
        const res = await supertest(app).post(prefix).send({
          email: 'invalid-email',
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request without password', async () => {
        const res = await supertest(app).post(prefix).send({
          email: 'valid-email@mail.com'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid password', async () => {
        const res = await supertest(app).post(prefix).send({
          email: 'valid-email@mail.com',
          senha: 'inval'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with an unexpected field', async () => {
        const res = await supertest(app).post(prefix).send({
          email: 'valid-email@mail.com',
          senha: 'valid-password',
          field: 'unexpected-field'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "not found" when request with email that was not registred', async () => {
        const res = await supertest(app).post(prefix).send({
          email: 'valid-email@mail.com',
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(404)
      })

      it('should throw "unauthorized" when request with incorrect password', async () => {
        const res = await supertest(app).post(prefix).send({
          email: 'other-valid-email@mail.com',
          senha: 'invalid-password'
        })

        expect(res.statusCode).toBe(401)
      })

      it('should throw "OK" when request with correct fields', async () => {
        const res = await supertest(app).post(prefix).send({
          email: 'other-valid-email@mail.com',
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('acess_token')
      })
    })
  })

  describe('/api/v1/people', () => {
    describe('POST - create a user', () => {
      const prefix = '/api/v1/people'

      it('should throw "bad request" when request without body request', async () => {
        const res = await supertest(app).post(prefix).send({})

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request without required field', async () => {
        const res = await supertest(app).post(prefix).send({
          cpf: '86416348004',
          data_nascimento: '23/02/2002',
          email: 'valid-email@gmail.com',
          senha: 'valid-password',
          habilitado: 'sim'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "cpf" field', async () => {
        const res = await supertest(app).post(prefix).send({
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
        const res = await supertest(app).post(prefix).send({
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
        const res = await supertest(app).post(prefix).send({
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
        const res = await supertest(app).post(prefix).send({
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
        const res = await supertest(app).post(prefix).send({
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
        const res = await supertest(app).post(prefix).send({
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
        const res = await supertest(app).post(prefix).send({
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
        const res = await supertest(app).post(prefix).send({
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

  describe('/api/v1/car', () => {
    const prefix = '/api/v1/car'

    describe('POST - create a car', () => {
      it('should throw "bad request" when request without request body', async () => {
        const res = await supertest(app).post(prefix).send({})

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "modelo" field', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 1000,
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "cor" field', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 'GM S10 2.8',
          cor: 1000,
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "ano" field', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 'invalid-year',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 1949,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: new Date().getFullYear() + 1,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "acessorios" field without child', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 'invalid-field'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "ok" when request with correct request body', async () => {
        const res = await supertest(app).post(prefix).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(201)
      })
    })

    describe('DELETE - delete a car', () => {
      it('should throw "bad request" when request with invalid "id" field', async () => {
        const res = await supertest(app).delete(prefix + '/invalid-id')

        expect(res.statusCode).toBe(400)
      })

      it('should throw "not found" when request with id value that dont exists', async () => {
        const res = await supertest(app).delete(prefix + '/507f1f77bcf86cd799439011')

        expect(res.statusCode).toBe(404)
      })

      it('should throw "ok" when request with correct fields', async () => {
        const res = await supertest(app).delete(`${prefix}/${carEntities[0]._id}`)

        expect(res.statusCode).toBe(204)
      })
    })

    describe('GET - find car by id', () => {
      it('should throw "bad request" when request with invalid "id" field', async () => {
        const res = await supertest(app).get(prefix + '/invalid-id')

        expect(res.statusCode).toBe(400)
      })

      it('should throw "not found" when request with id value that dont exists', async () => {
        const res = await supertest(app).get(prefix + '/507f1f77bcf86cd799439011')

        expect(res.statusCode).toBe(404)
      })

      it('should throw "ok" when request with correct fields', async () => {
        const res = await supertest(app).get(`${prefix}/${carEntities[1]._id}`)

        expect(res.statusCode).toBe(200)
      })
    })

    describe('PUT - update a car', () => {
      it('should throw "bad request" when request with invalid "id" field', async () => {
        const res = await supertest(app).put(prefix + '/invalid-id')

        expect(res.statusCode).toBe(400)
      })

      it('should throw "not found" when request with id value that dont exists', async () => {
        const res = await supertest(app).put(prefix + '/507f1f77bcf86cd799439011').send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(404)
      })

      it('should throw "bad request" when request without request body', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`)

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request without required field', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "modelo" field', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 1000,
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "cor" field', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 1000,
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "ano" field', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 'invalid-year',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 1949,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: new Date().getFullYear() + 1,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "acessorios" field without child', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 'invalid-field'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "ok" when request with correct request body', async () => {
        const res = await supertest(app).put(`${prefix}/${carEntities[1]._id}`).send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })

        expect(res.statusCode).toBe(204)
      })
    })

    describe('GET - find all cars', () => {
      it('should sucess when request with no request body', async () => {
        const res = await supertest(app).get(prefix)

        expect(res.statusCode).toBe(200)
      })

      it('should throw "bad request" when request with invalid "ano" field', async () => {
        const res = await supertest(app).get(prefix).query({
          ano: 'invalid-year'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
        const res = await supertest(app).get(prefix).query({
          ano: 1949
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
        const res = await supertest(app).get(prefix).query({
          ano: new Date().getFullYear() + 1
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
        const res = await supertest(app).get(prefix).query({
          quantidadePassageiros: 'invalid-field'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "limit" field', async () => {
        const res = await supertest(app).get(prefix).query({
          limit: 'invalid-field'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "limit" field smaller than 1', async () => {
        const res = await supertest(app).get(prefix).query({
          limit: 0
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid "offset" field', async () => {
        const res = await supertest(app).get(prefix).query({
          offset: 'invalid-field'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with "offset" field smaller than 1', async () => {
        const res = await supertest(app).get(prefix).query({
          offset: 0
        })

        expect(res.statusCode).toBe(400)
      })

      it('should pagination "limit" work', async () => {
        const res = await supertest(app).get(prefix).query({
          limit: 1
        })

        expect(res.body.limit).toBe(1)
        expect(res.body.veiculos.length).toBe(1)
      })

      it('should pagination "limit" work', async () => {
        const res = await supertest(app).get(prefix).query({
          limit: 1,
          offset: 1
        })

        expect(res.body.offset).toBe(2)
      })
    })
  })
})
