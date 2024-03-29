import supertest from 'supertest';

import JWT from '../../../../src/utils/jwt.util';
import { Application, IApplicationResponse } from '../../support/application.support';

describe('POST - login', () => {
  const path = '/api/v1/authenticate';

  let dependecies: IApplicationResponse;

  beforeAll(async () => {
    dependecies = await Application.start();
  });

  afterAll(async () => {
    await dependecies.end();
  });

  it('should throw "bad request" when request without body request', async () => {
    const res = await supertest(dependecies.app).post(path);

    expect(res.statusCode).toBe(400);
    expect(Array.isArray(res.body)).toBe(true);

    for (let i = 0; i < res.body.length; i += 1) {
      expect(res.body[i]).toHaveProperty('name');
      expect(res.body[i]).toHaveProperty('description');
    }
  });

  it('should throw "bad request" when request without email', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      senha: 'valid-password',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('email');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid email', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      email: 'invalid-email',
      senha: 'valid-password',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('email');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request without password', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      email: 'valid-email@mail.com',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('senha');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid password', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      email: 'valid-email@mail.com',
      senha: 'inval',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('senha');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with an unexpected field', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      email: 'valid-email@mail.com',
      senha: 'valid-password',
      field: 'unexpected-field',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('field');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "not found" when request with email that was not registred', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      email: 'valid-email@mail.com',
      senha: 'valid-password',
    });

    expect(res.statusCode).toBe(404);

    expect(res.body.name).toBe('Not Found');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "unauthorized" when request with incorrect password', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      email: 'other-valid-email@mail.com',
      senha: 'invalid-password',
    });

    expect(res.statusCode).toBe(401);

    expect(res.body.name).toBe('Unauthorized');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "OK" when request with correct fields', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      email: 'other-valid-email@mail.com',
      senha: 'valid-password',
    });

    expect(res.body).toHaveProperty('access_token');

    const payload: any = JWT.verify(res.body.access_token);

    expect(payload.email).toBe('other-valid-email@mail.com');
    expect(payload.habilitado).toBe('sim');

    expect(res.body).toHaveProperty('type');
    expect(res.body.type).toBe('bearer');

    expect(res.body).toHaveProperty('expires_in');
    expect(res.body.expires_in).toBe(86400);

    expect(res.statusCode).toBe(200);
  });
});
