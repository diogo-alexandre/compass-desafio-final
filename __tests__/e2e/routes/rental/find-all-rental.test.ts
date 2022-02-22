import supertest from 'supertest';

import { Application, IApplicationResponse } from '../../support/application.support';

describe('GET - find all rentals', () => {
  const path = '/api/v1/rental';

  let dependecies: IApplicationResponse;

  beforeAll(async () => {
    dependecies = await Application.start();
  });

  afterAll(async () => {
    await dependecies.end();
  });

  it('should sucess when request with no request body', async () => {
    const res = await supertest(dependecies.app)
      .get(path);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(Array.isArray(res.body.locadoras)).toBe(true);

    for (let i = 0; i < res.body.locadoras.length; i += 1) {
      const rental = res.body.locadoras[i];
      const rentalDB = dependecies.entities.rental[i];

      expect(rental._id).toBe(rentalDB._id.toString());
    }

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(dependecies.entities.rental.length);

    expect(res.body).toHaveProperty('limit');
    expect(res.body.limit).toBe(10);

    expect(res.body).toHaveProperty('offset');
    expect(res.body.offset).toBe(1);

    expect(res.body).toHaveProperty('offsets');
    expect(res.body.offsets).toBe(1);
  });

  it('should filter by "nome" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ nome: 'Localiza Rent a Car' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(2);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[0]._id.toString());
    expect(res.body.locadoras[1]._id).toBe(dependecies.entities.rental[1]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(2);
  });

  it('should filter by "cnpj" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ cnpj: '16.670.085/0001-55' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[0]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should filter by "atividades" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ atividades: 'Aluguel de Carros E Gestão de Frotas' });

    expect(res.statusCode).toBe(200);

    for (let i = 0; i < res.body.locadoras.length; i += 1) {
      const rental = res.body.locadoras[i];
      const rentalDB = dependecies.entities.rental[i];

      expect(rental._id).toBe(rentalDB._id.toString());
    }

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(3);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[0]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(3);
  });

  it('should filter by "endereco.cep" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ cep: '96200-500' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[1]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should filter by "endereco.logradouro" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ logradouro: 'Rua General Gurjão' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[1]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should filter by "endereco.complemento" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ complemento: 'Muro A' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[1]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should filter by "endereco.bairro" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ bairro: 'Espinheiro' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[0]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should filter by "endereco.number" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ number: '5678' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[1]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should filter by "endereco.localidade" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ localidade: 'Recife' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[0]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should filter by "endereco.uf" field work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({ uf: 'pe' });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('locadoras');
    expect(res.body.locadoras.length).toBe(1);

    expect(res.body.locadoras[0]._id).toBe(dependecies.entities.rental[0]._id.toString());

    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBe(1);
  });

  it('should throw "bad request" when request with empty "nome" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path).query({
        nome: '',
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('nome');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "cnpj" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        cnpj: 'invalid-field',
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('cnpj');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with empty "atividades" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        atividades: '',
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('atividades');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "limit" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 'invalid-field',
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('limit');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "limit" field smaller than 1', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 0,
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('limit');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with invalid "offset" field', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        offset: 'invalid-field',
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('offset');
    expect(res.body).toHaveProperty('description');
  });

  it('should throw "bad request" when request with "offset" field smaller than 1', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        offset: 0,
      });

    expect(res.statusCode).toBe(400);

    expect(res.body.name).toBe('offset');
    expect(res.body).toHaveProperty('description');
  });

  it('should pagination "limit" work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 1,
      });

    const rental = res.body.locadoras[0];
    const rentalDB = dependecies.entities.rental[0];

    expect(rental._id).toBe(rentalDB._id.toString());

    expect(res.body.limit).toBe(1);
    expect(res.body.locadoras.length).toBe(1);
  });

  it('should pagination "offset" work', async () => {
    const res = await supertest(dependecies.app)
      .get(path)
      .query({
        limit: 1,
        offset: 1,
      });

    const rental = res.body.locadoras[0];
    const rentalDB = dependecies.entities.rental[1];

    expect(rental._id).toBe(rentalDB._id.toString());
    expect(res.body.offset).toBe(2);
  });
});
