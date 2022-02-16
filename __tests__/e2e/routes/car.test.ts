import supertest from 'supertest'

import { JWT } from '../../../src/utils/jwt.util'
import { IAuthResponse } from '../../../src/helpers/interfaces/auth.interface'
import { Application, IApplicationResponse } from '../support/application.support'
import { ICar } from '../../../src/helpers/interfaces/entities/car.interface'

describe('Feature test endpoint CAR', () => {
  const path = '/api/v1/car'

  let dependecies: IApplicationResponse
  let jwt: IAuthResponse

  beforeAll(async () => {
    dependecies = await Application.start()

    jwt = JWT.generate({
      email: dependecies.entities.people[0].email,
      habilitado: dependecies.entities.people[0].habilitado
    })
  })

  afterAll(async () => {
    await dependecies.end()
  })

  describe('POST - create a car', () => {
    it('should throw "bad request" when request without request body', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({})
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "modelo" field', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 1000,
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "cor" field', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 'GM S10 2.8',
          cor: 1000,
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "ano" field', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 'invalid-year',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 1949,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: new Date().getFullYear() + 1,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "acessorios" field without child', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 'invalid-field'
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "ok" when request with correct request body', async () => {
      const res = await supertest(dependecies.app)
        .post(path)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(201)
    })
  })

  describe('DELETE - delete a car', () => {
    it('should throw "bad request" when request with invalid "id" field', async () => {
      const res = await supertest(dependecies.app)
        .delete(path + '/invalid-id')
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "not found" when request with id value that dont exists', async () => {
      const res = await supertest(dependecies.app)
        .delete(path + '/507f1f77bcf86cd799439011')
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(404)
    })

    it('should throw "ok" when request with correct fields', async () => {
      const { _id } = dependecies.entities.car.find(car => car.modelo === 'TO DELETE ENTITY') as ICar

      const res = await supertest(dependecies.app)
        .delete(`${path}/${_id.toString()}`)
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(204)
    })
  })

  describe('GET - find car by id', () => {
    it('should throw "bad request" when request with invalid "id" field', async () => {
      const res = await supertest(dependecies.app)
        .get(path + '/invalid-id')
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "not found" when request with id value that dont exists', async () => {
      const res = await supertest(dependecies.app)
        .get(path + '/507f1f77bcf86cd799439011')
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(404)
    })

    it('should throw "ok" when request with correct fields', async () => {
      const res = await supertest(dependecies.app)
        .get(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(200)
    })
  })

  describe('PUT - update a car', () => {
    it('should throw "bad request" when request with invalid "id" field', async () => {
      const res = await supertest(dependecies.app)
        .put(path + '/invalid-id')
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "not found" when request with id value that dont exists', async () => {
      const res = await supertest(dependecies.app).put(path + '/507f1f77bcf86cd799439011')
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(404)
    })

    it('should throw "bad request" when request without request body', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request without required field', async () => {
      const res = await supertest(dependecies.app).put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "modelo" field', async () => {
      const res = await supertest(dependecies.app).put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 1000,
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "cor" field', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 1000,
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "ano" field', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 'invalid-year',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: 1949,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: new Date().getFullYear() + 1,
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "acessorios" field without child', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 'invalid-field'
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "ok" when request with correct request body', async () => {
      const res = await supertest(dependecies.app)
        .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
        .send({
          modelo: 'GM S10 2.8',
          cor: 'branco',
          ano: '2021',
          acessorios: [{ descricao: 'Ar-condicionado' }],
          quantidadePassageiros: 5
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(204)
    })
  })

  describe('GET - find all cars', () => {
    it('should sucess when request with no request body', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(200)
    })

    it('should throw "bad request" when request with invalid "ano" field', async () => {
      const res = await supertest(dependecies.app)
        .get(path).query({
          ano: 'invalid-year'
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          ano: 1949
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          ano: new Date().getFullYear() + 1
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          quantidadePassageiros: 'invalid-field'
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "limit" field', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          limit: 'invalid-field'
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "limit" field smaller than 1', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          limit: 0
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with invalid "offset" field', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          offset: 'invalid-field'
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should throw "bad request" when request with "offset" field smaller than 1', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          offset: 0
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.statusCode).toBe(400)
    })

    it('should pagination "limit" work', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          limit: 1
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.body.limit).toBe(1)
      expect(res.body.veiculos.length).toBe(1)
    })

    it('should pagination "limit" work', async () => {
      const res = await supertest(dependecies.app)
        .get(path)
        .query({
          limit: 1,
          offset: 1
        })
        .set('Authorization', `${jwt.type} ${jwt.access_token}`)

      expect(res.body.offset).toBe(2)
    })
  })
})
