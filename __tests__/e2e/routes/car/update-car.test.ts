import supertest from 'supertest';

import JWT from '../../../../src/utils/jwt.util';
import { IAuthResponse } from '../../../../src/helpers/interfaces/auth.interface';
import { Application, IApplicationResponse } from '../../support/application.support';

describe('PUT - update a car', () => {
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
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      });

    expect(res.statusCode).toBe(403);

    expect(res.body.name).toBe('Forbidden');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw bad request when request with invalid token type', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `Invalid ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('Bad Request');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw bad request when request with invalid token type', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `Invalid ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('Bad Request');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw bad request when request with unsupported token type', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
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
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${tokenExpired.access_token}`);

    expect(res.statusCode).toBe(401);

    expect(res.body.name).toBe('Unauthorized');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "id" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/invalid-id`)
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('id');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "not found" when request with id value that dont exists', async () => {
    const res = await supertest(dependecies.app).put(`${path}/507f1f77bcf86cd799439011`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(404);

    expect(res.body.name).toBe('Not Found');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request without request body', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);
    expect(Array.isArray(res.body)).toBe(true);

    for (let i = 0; i < res.body.length; i += 1) {
      expect(res.body[i]).toHaveProperty('name');
      expect(res.body[i]).toHaveProperty('description');
    }
  });

  it('should throw "bad request" when request without required field', async () => {
    const res = await supertest(dependecies.app).put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('acessorios');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "modelo" field', async () => {
    const res = await supertest(dependecies.app).put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 1000,
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('modelo');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "cor" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 1000,
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('cor');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "ano" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 'invalid-year',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('ano');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "ano" value smaller than 1950', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: 1949,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('ano');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "ano" value bigger than current year', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: new Date().getFullYear() + 1,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('ano');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "acessorios" field without child', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('acessorios');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "quantidadePassageiros" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 'invalid-field',
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('quantidadePassageiros');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "ok" when request with correct request body', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.car[0]._id.toString()}`)
      .send({
        modelo: 'GM S10 2.8',
        cor: 'branco',
        ano: '2021',
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5,
      })
      .set('Authorization', `${jwt.type} ${jwt.access_token}`);

    expect(res.statusCode).toBe(204);
    expect(Object.keys(res.body).length).toBe(0);
  });
});
