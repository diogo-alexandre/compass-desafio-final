import supertest from 'supertest'

import { JWT } from '../../../../src/utils/jwt.util'
import { IAuthResponse } from '../../../../src/helpers/interfaces/auth.interface'
import { Application, IApplicationResponse } from '../../support/application.support'

describe('POST - create a car', () => {
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

  it('should throw forbidden when request without token', async () => {
    const res = await supertest(dependecies.app)
      .post(path)

    expect(res.statusCode).toBe(403)

    expect(res.body.name).toBe('Forbidden')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw bad request when request with invalid token type', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .set('Authorization', `Invalid ${jwt.access_token}`)

    expect(res.statusCode).toBe(400)

    expect(res.body.name).toBe('Bad Request')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw bad request when request with unsupported token type', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .set('Authorization', `${jwt.type} eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`)

    expect(res.statusCode).toBe(400)

    expect(res.body.name).toBe('Bad Request')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw unauthorized when request with expired token', async () => {
    const tokenExpired = JWT.generate({
      email: dependecies.entities.people[0].email,
      habilitado: dependecies.entities.people[0].habilitado
    }, 0)

    const res = await supertest(dependecies.app)
      .post(path)
      .set('Authorization', `${jwt.type} ${tokenExpired.access_token}`)

    expect(res.statusCode).toBe(401)

    expect(res.body.name).toBe('Unauthorized')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw "bad request" when request without request body', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({})
      .set('Authorization', `${jwt.type} ${jwt.access_token}`)

    expect(res.statusCode).toBe(400)
    expect(Array.isArray(res.body)).toBe(true)

    for (let i = 0; i < res.body; i++) {
      expect(res.body[i]).toHaveProperty('name')
      expect(res.body[i]).toHaveProperty('description')
    }
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

    expect(res.body.name).toBe('modelo')
    expect(res.body).toHaveProperty('description')
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

    expect(res.body.name).toBe('cor')
    expect(res.body).toHaveProperty('description')
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

    expect(res.body.name).toBe('ano')
    expect(res.body).toHaveProperty('description')
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

    expect(res.body.name).toBe('ano')
    expect(res.body).toHaveProperty('description')
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

    expect(res.body.name).toBe('ano')
    expect(res.body).toHaveProperty('description')
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

    expect(res.body.name).toBe('acessorios')
    expect(res.body).toHaveProperty('description')
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

    expect(res.body.name).toBe('quantidadePassageiros')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw "ok" when request with correct request body', async () => {
    const payload = {
      modelo: 'GM S10 2.8',
      cor: 'branco',
      ano: '2021',
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    }

    const res = await supertest(dependecies.app)
      .post(path)
      .send(payload)
      .set('Authorization', `${jwt.type} ${jwt.access_token}`)

    expect(res.statusCode).toBe(201)

    Object.keys(payload).forEach((key: string) => {
      expect(res.body).toHaveProperty(key)
    })

    expect(res.body).toHaveProperty('_id')

    for (let i = 0; i < res.body.acessorios; i++) {
      expect(res.body.acessorios[i]).toHaveProperty('_id')
      expect(res.body.acessorios[i]).toHaveProperty('descricao')
    }
  })
})
