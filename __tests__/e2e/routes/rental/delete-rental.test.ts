import supertest from 'supertest'

import { Application, IApplicationResponse } from '../../support/application.support'
import { IRental } from '../../../../src/helpers/interfaces/entities/rental.interface'

describe('DELETE - delete a rental', () => {
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
      .delete(path + '/invalid-id')

    expect(res.statusCode).toBe(400)

    expect(res.body.name).toBe('id')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw "not found" when request with id value that dont exists', async () => {
    const res = await supertest(dependecies.app)
      .delete(path + '/507f1f77bcf86cd799439011')

    expect(res.statusCode).toBe(404)

    expect(res.body.name).toBe('Not Found')
    expect(res.body).toHaveProperty('description')
  })

  it('should throw "ok" when request with correct fields', async () => {
    const { _id } = dependecies.entities.rental.find(rental => rental.nome === 'TO DELETE ENTITY') as IRental

    const res = await supertest(dependecies.app)
      .delete(`${path}/${_id.toString()}`)

    expect(res.statusCode).toBe(204)
    expect(Object.keys(res.body).length).toBe(0)
  })
})
