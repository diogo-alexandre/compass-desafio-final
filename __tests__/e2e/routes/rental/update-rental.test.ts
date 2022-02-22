import supertest from 'supertest';

import { Application, IApplicationResponse } from '../../support/application.support';

describe('PUT - update a rental', () => {
  const path = '/api/v1/rental';

  let dependecies: IApplicationResponse;

  beforeAll(async () => {
    dependecies = await Application.start();
  });

  afterAll(async () => {
    await dependecies.end();
  });

  it('should throw "bad request" when request with invalid "id" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/invalid-id`);

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('id');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "not found" when request with id value that dont exists', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/507f1f77bcf86cd799439011`)
      .send({
        nome: 'Locadora',
        cnpj: '74.167.968/0001-43',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '52021-180',
            number: '1234',
            isFilial: false,
          },
        ],
      });

    expect(res.statusCode).toBe(404);

    expect(res.body.name).toBe('Not Found');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request without request body', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`);

    expect(res.statusCode).toBe(400);
    expect(Array.isArray(res.body)).toBe(true);

    for (let i = 0; i < res.body.length; i += 1) {
      expect(res.body[i]).toHaveProperty('name');
      expect(res.body[i]).toHaveProperty('description');
    }
  });

  it('should throw "bad request" when request without required field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Locadora',
        cnpj: '74.167.968/0001-43',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('endereco');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "nome" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 1000,
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: '1234',
          isFilial: false,
        }],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('nome');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid cnpj field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: 'invalid-cnpj',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: '1234',
          isFilial: false,
        }],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('cnpj');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "atividades" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 1000,
        endereco: [{
          cep: '96200-200',
          number: '1234',
          isFilial: false,
        }],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('atividades');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "endereco" field without child', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('endereco');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "endereco" field without child', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('endereco');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid format "endereco.cep" field', async () => {
    const res = await supertest(dependecies.app)
      .post(path)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: 'invalid format',
          number: '1234',
          isFilial: false,
        }],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('Bad Request');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "endereco.cep" that dont exists', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '00000-000',
          number: '1234',
          isFilial: false,
        }],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('Bad Request');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "endereco.number" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: false,
          isFilial: false,
        }],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('endereco,0,number');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "endereco.isFilial" field', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [{
          cep: '96200-200',
          number: '2283',
          isFilial: 'invalid option',
        }],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('endereco,0,isFilial');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with two or more isFilial equal false', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Localiza Rent a Car',
        cnpj: '99.809.007/0001-16',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '96200-200',
            number: '2283',
            isFilial: false,
          },
          {
            cep: '96200-200',
            number: '2283',
            isFilial: false,
          },
        ],
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('endereco,1');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "ok" when request with correct request body', async () => {
    const res = await supertest(dependecies.app)
      .put(`${path}/${dependecies.entities.rental[0]._id.toString()}`)
      .send({
        nome: 'Locadora',
        cnpj: '74.167.968/0001-43',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '52021-180',
            number: '1234',
            isFilial: false,
          },
        ],
      });

    expect(res.statusCode).toBe(204);
    expect(Object.keys(res.body).length).toBe(0);
  });
});
