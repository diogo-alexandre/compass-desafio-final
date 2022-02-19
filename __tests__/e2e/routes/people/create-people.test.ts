import supertest from 'supertest';

import { Application, IApplicationResponse } from '../../support/application.support';

describe('POST - create a user', () => {
  const path = '/api/v1/people';

  let dependecies: IApplicationResponse;

  beforeAll(async () => {
    dependecies = await Application.start();
  });

  afterAll(async () => {
    await dependecies.end();
  });

  it('should throw "bad request" when request without body request', async () => {
    const res = await supertest(dependecies.app).post(path).send({});

    expect(res.statusCode).toBe(400);
    expect(Array.isArray(res.body)).toBe(true);

    for (let i = 0; i < res.body.length; i += 1) {
      expect(res.body[i]).toHaveProperty('name');
      expect(res.body[i]).toHaveProperty('description');
    }
  });

  it('should throw "bad request" when request without required field', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      cpf: '86416348004',
      data_nascimento: '23/02/2002',
      email: 'valid-email@gmail.com',
      senha: 'valid-password',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('nome');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "cpf" field', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: 'invalid-cpf-field',
      data_nascimento: '23/02/2002',
      email: 'valid-email@gmail.com',
      senha: 'valid-password',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(400);

    expect(Array.isArray(res.body)).toBe(true);

    for (let i = 0; i < res.body.length; i += 1) {
      expect(res.body[i].name).toBe('cpf');
      expect(res.body[i]).toHaveProperty('description');
    }
  });

  it('should throw "bad request" when request with invalid "data_nascimento" field', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: '86416348004',
      data_nascimento: 'invalid-date',
      email: 'valid-email@gmail.com',
      senha: 'valid-password',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('data_nascimento');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "data_nascimento" date format field', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: '86416348004',
      data_nascimento: '2002/02/23',
      email: 'valid-email@gmail.com',
      senha: 'valid-password',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('data_nascimento');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "email" field', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: '86416348004',
      data_nascimento: '23/02/2002',
      email: 'invalid-email',
      senha: 'valid-password',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('email');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "senha" field less than 6 characters', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: '86416348004',
      data_nascimento: '23/02/2002',
      email: 'valid-email@mail.com',
      senha: 'inval',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('senha');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "habilitado" field', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: '86416348004',
      data_nascimento: '23/02/2002',
      email: 'valid-email@mail.com',
      senha: 'valid-password',
      habilitado: 'invalid-option',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('habilitado');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "conflict" when request with fields that already exists on app', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: '68206259015',
      data_nascimento: '23/02/2002',
      email: 'other-valid-email@mail.com',
      senha: 'valid-password',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(409);

    expect(res.body.name).toBe('Conflict');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "OK" when request with request body correctly', async () => {
    const res = await supertest(dependecies.app).post(path).send({
      nome: 'valid-name',
      cpf: '86416348004',
      data_nascimento: '23/02/2002',
      email: 'valid-email@mail.com',
      senha: 'valid-password',
      habilitado: 'sim',
    });

    expect(res.statusCode).toBe(201);
    expect(Object.keys(res.body).length).toBe(0);
  });
});
