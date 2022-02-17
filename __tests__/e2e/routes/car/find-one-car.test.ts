import supertest from 'supertest'

import { JWT } from '../../../../src/utils/jwt.util'
import { IAuthResponse } from '../../../../src/helpers/interfaces/auth.interface'
import { Application, IApplicationResponse } from '../../support/application.support'

describe('GET - find car by id', () => {
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
