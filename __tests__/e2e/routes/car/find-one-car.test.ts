import supertest from 'supertest';

import JWT from '../../../../src/utils/jwt.util';
import { IAuthResponse } from '../../../../src/helpers/interfaces/auth.interface';
import { Application, IApplicationResponse } from '../../support/application.support';

describe('GET - find car by id', () => {
  const path = '/api/v1/car';

  let dependecies: IApplicationResponse;
  let jwt: IAuthResponse;

  beforeAll(async () => {
    dependecies = await Application.start();

    jwt = JWT.generate({
      email: dependecies.entities.people[0].email,
      habilitado: dependecies.entities.people[0].habilitado,
    });
  });

  afterAll(async () => {
    await dependecies.end();
  });

  it('should throw forbidden when request without token', async () => {
    const res = await supertest(dependecies.app)
      .get(`${path}/${dependecies.entities.car[0]._id}`);

    expect(res.statusCode).toBe(403);

    expect(res.body.name).toBe('Forbidden');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw bad request when request with invalid token type', async () => {
    const res = await supertest(dependecies.app)
      .get(`${path}/${dependecies.entities.car[0]._id}`)
      .set('Authorization', `Invalid ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('Bad Request');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw bad request when request with unsupported token type', async () => {
    const res = await supertest(dependecies.app)
      .get(`${path}/${dependecies.entities.car[0]._id}`)
      .set('Authorization', `${jwt.type} eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('Bad Request');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw unauthorized when request with expired token', async () => {
    const tokenExpired = JWT.generate({
      email: dependecies.entities.people[0].email,
      habilitado: dependecies.entities.people[0].habilitado,
    }, 0);

    const res = await supertest(dependecies.app)
      .get(`${path}/${dependecies.entities.car[0]._id}`)
      .set('Authorization', `${jwt.type} ${tokenExpired.access_token}`);

    expect(res.statusCode).toBe(401);

    expect(res.body.name).toBe('Unauthorized');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "id" field', async () => {
    const res = await supertest(dependecies.app)
      .get(`${path}/invalid-id`)
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('id');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "not found" when request with id value that dont exists', async () => {
    const res = await supertest(dependecies.app)
      .get(`${path}/507f1f77bcf86cd799439011`)
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(404);

    expect(res.body.name).toBe('Not Found');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "ok" when request with correct fields', async () => {
    const res = await supertest(dependecies.app)
      .get(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(dependecies.entities.car[0]._id.toString());
  });
});
