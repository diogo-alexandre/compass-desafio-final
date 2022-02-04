import mongoose from 'mongoose'
import supertest from 'supertest'
import { Express } from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { App } from '../../src/App'
import { PeopleSeeder } from './seeders/people.seeder'

describe('Feature Test', () => {
  let mongod: MongoMemoryServer
  let app: Express

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    app = await App.init({
      db_uri: mongod.getUri() + 'e2e'
    })

    await PeopleSeeder.handle()
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  })

  describe('/Authenticate', () => {
    describe('POST - login', () => {
      it('should throw "bad request" when request without body request', async () => {
        const res = await supertest(app).post('/api/v1/authenticate')

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request without email', async () => {
        const res = await supertest(app).post('/api/v1/authenticate').send({
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid email', async () => {
        const res = await supertest(app).post('/api/v1/authenticate').send({
          email: 'invalid-email',
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request without password', async () => {
        const res = await supertest(app).post('/api/v1/authenticate').send({
          email: 'valid-email@mail.com'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "bad request" when request with invalid password', async () => {
        const res = await supertest(app).post('/api/v1/authenticate').send({
          email: 'valid-email@mail.com',
          senha: 'inval'
        })

        expect(res.statusCode).toBe(400)
      })

      it('should throw "not found" when request with email that was not registred', async () => {
        const res = await supertest(app).post('/api/v1/authenticate').send({
          email: 'valid-email@mail.com',
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(404)
      })

      it('should throw "unauthorized" when request with incorrect password', async () => {
        const res = await supertest(app).post('/api/v1/authenticate').send({
          email: 'other-valid-email@mail.com',
          senha: 'invalid-password'
        })

        expect(res.statusCode).toBe(401)
      })

      it('should throw "OK" when request with correct fields', async () => {
        const res = await supertest(app).post('/api/v1/authenticate').send({
          email: 'other-valid-email@mail.com',
          senha: 'valid-password'
        })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('acess_token')
      })
    })
  })
})
