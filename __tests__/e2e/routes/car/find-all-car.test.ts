import supertest from 'supertest';

import JWT from '../../../../src/utils/jwt.util';
import { IAuthResponse } from '../../../../src/helpers/interfaces/auth.interface';
import { Application, IApplicationResponse } from '../../support/application.support';

describe('GET - find all cars', () => {
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

  it('should throw unauthorized when request without token', async () => {
    const res = await supertest(dependecies.app)
      .get(path);

    expect(res.statusCode).toBe(401);

    expect(res.body.name).toBe('Unauthorized');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw bad request when request with invalid token type', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .set('Authorization', `Invalid ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('Bad Request');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw bad request when request with unsupported token type', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
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
      .get(path)
      .set('Authorization', `${jwt.type} ${tokenExpired.access_token}`);

    expect(res.statusCode).toBe(401);

    expect(res.body.name).toBe('Unauthorized');
    expect(res.body).toHaveProperty('description');
  });

  it('should sucess when request with no request body', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('veiculos');
    expect(Array.isArray(res.body.veiculos)).toBe(true);

    for (let i = 0; i < res.body.veiculos.length; i += 1) {
      const veiculo = res.body.veiculos[i];
      const veiculoDB = dependecies.entities.car[i];

      expect(veiculo._id).toBe(veiculoDB._id.toString());
    }

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(dependecies.entities.car.length);

    expect(res.body).toHaveProperty('limit');
    expect(res.body.limit).toBe(10);

    expect(res.body).toHaveProperty('offset');
    expect(res.body.offset).toBe(1);

    expect(res.body).toHaveProperty('offsets');
    expect(res.body.offsets).toBe(1);
  });

  it('should sucess when filter "modelo" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        modelo: 'GM S10 2.8',
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('veiculos');
    expect(Array.isArray(res.body.veiculos)).toBe(true);

    const veiculo = res.body.veiculos[0];
    const veiculoDB = dependecies.entities.car[0];

    expect(veiculo._id).toBe(veiculoDB._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);

    expect(res.body).toHaveProperty('limit');
    expect(res.body.limit).toBe(10);

    expect(res.body).toHaveProperty('offset');
    expect(res.body.offset).toBe(1);

    expect(res.body).toHaveProperty('offsets');
    expect(res.body.offsets).toBe(1);
  });

  it('should sucess when filter "acessorio" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        'acessorios[]': 'Ar-condicionado',
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('veiculos');
    expect(Array.isArray(res.body.veiculos)).toBe(true);

    for (let i = 0; i < res.body.veiculos.length; i += 1) {
      const veiculo = res.body.veiculos[i];
      const veiculoDB = dependecies.entities.car[i];

      expect(veiculo._id).toBe(veiculoDB._id.toString());
    }

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(2);

    expect(res.body).toHaveProperty('limit');
    expect(res.body.limit).toBe(10);

    expect(res.body).toHaveProperty('offset');
    expect(res.body.offset).toBe(1);

    expect(res.body).toHaveProperty('offsets');
    expect(res.body.offsets).toBe(1);
  });

  it('should throw "bad request" when request with invalid "ano" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path).query({
        ano: 'invalid-year',
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('ano');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        ano: 1949,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('ano');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        ano: new Date().getFullYear() + 1,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('ano');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        quantidadePassageiros: 'invalid-field',
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('quantidadePassageiros');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "limit" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 'invalid-field',
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('limit');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "limit" field smaller than 1', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 0,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('limit');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "offset" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        offset: 'invalid-field',
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('offset');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "offset" field smaller than 1', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        offset: 0,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('offset');
    expect(res.body).toHaveProperty('description');
  });

  it('should pagination "limit" work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 1,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    const veiculo = res.body.veiculos[0];
    const veiculoDB = dependecies.entities.car[0];

    expect(veiculo._id).toBe(veiculoDB._id.toString());

    expect(res.body.limit).toBe(1);
    expect(res.body.veiculos.length).toBe(1);
  });

  it('should pagination "limit" work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 1,
        offset: 1,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    const veiculo = res.body.veiculos[0];
    const veiculoDB = dependecies.entities.car[1];

    expect(veiculo._id).toBe(veiculoDB._id.toString());
    expect(res.body.offset).toBe(2);
  });
});
