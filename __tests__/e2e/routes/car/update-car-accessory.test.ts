import supertest from 'supertest'

import { JWT } from '../../../../src/utils/jwt.util'
import { IAuthResponse } from '../../../../src/helpers/interfaces/auth.interface'
import { Application, IApplicationResponse } from '../../support/application.support'

describe('PATCH - update a car accessory', () => {
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
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/${dependecies.entities.car[0].acessorios[0]._id}`)
      .send({ descricao: 'Valid description' })

    expect(res.statusCode).toBe(403)

    expect(res.body.name).toBe('Forbidden')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw bad request when request with invalid token type', async () => {
    const res = await supertest(dependecies.app)
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/${dependecies.entities.car[0].acessorios[0]._id}`)
      .send({ descricao: 'Valid description' })
      .set('Authorization', `Invalid ${jwt.access_token}`)

    expect(res.statusCode).toBe(400)

    expect(res.body.name).toBe('Bad Request')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw bad request when request with unsupported token type', async () => {
    const res = await supertest(dependecies.app)
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/${dependecies.entities.car[0].acessorios[0]._id}`)
      .send({ descricao: 'Valid description' })
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
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/${dependecies.entities.car[0].acessorios[0]._id}`)
      .send({ descricao: 'Valid description' })
      .set('Authorization', `${jwt.type} ${tokenExpired.access_token}`)

    expect(res.statusCode).toBe(401)

    expect(res.body.name).toBe('Unauthorized')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw bad request when request with invalid accessory id', async () => {
    const res = await supertest(dependecies.app)
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/invalid-id`)
      .send({ descricao: 'Valid description' })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`)

    expect(res.statusCode).toBe(400)

    expect(res.body.name).toBe('acessorioId')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw bad request when request with accessory id that dont exists', async () => {
    const res = await supertest(dependecies.app)
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/620278d6030f60e763d6f463`)
      .send({ descricao: 'Valid description' })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`)

    expect(res.statusCode).toBe(404)

    expect(res.body.name).toBe('Not Found')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw bad request when request without "descricao" field', async () => {
    const res = await supertest(dependecies.app)
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/${dependecies.entities.car[0].acessorios[0]._id}`)
      .send({})
      .set('Authorization', `${jwt.type} ${jwt.access_token}`)

    expect(res.statusCode).toBe(400)

    expect(res.body.name).toBe('descricao')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw OK when request correctly', async () => {
    const res = await supertest(dependecies.app)
      .patch(`${path}/${dependecies.entities.car[0]._id}/acessorios/${dependecies.entities.car[0].acessorios[0]._id}`)
      .send({ descricao: 'Valid description' })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`)

    expect(res.statusCode).toBe(204)
    expect(Object.keys(res.body).length).toBe(0)
  })
})
