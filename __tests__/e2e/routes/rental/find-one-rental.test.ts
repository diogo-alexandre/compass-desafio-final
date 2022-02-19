import supertest from 'supertest'

import { Application, IApplicationResponse } from '../../support/application.support'

describe('GET - find rental by id', () => {
  const path = '/api/v1/rental'

  let dependecies: IApplicationResponse

  beforeAll(async () => {
    dependecies = await Application.start()
  })

  afterAll(async () => {
    await dependecies.end()
  })

  it('should throw "bad request" when request with invalid "id" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path + '/invalid-id')

    expect(res.statusCode).toBe(400)

    expect(res.body.name).toBe('id')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw "not found" when request with id value that dont exists', async () => {
    const res = await supertest(dependecies.app)
      .get(path + '/507f1f77bcf86cd799439011')

    expect(res.statusCode).toBe(404)

    expect(res.body.name).toBe('Not Found')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw "ok" when request with correct fields', async () => {
    const res = await supertest(dependecies.app)
      .get(`${path}/${dependecies.entities.rental[0]._id.toString()}`)

    expect(res.statusCode).toBe(200)

    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBe(dependecies.entities.rental[0]._id.toString())
  })
})
