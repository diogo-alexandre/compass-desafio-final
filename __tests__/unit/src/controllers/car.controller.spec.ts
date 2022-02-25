import { NextFunction, Request } from 'express';

import CarController from '../../../../src/controllers/car.controller';
import { Response } from '../../../../src/helpers/interfaces/response.interface';
import CarService from '../../../../src/services/car.service';

describe('Unit test Car Controller', () => {
  let carService: CarService;
  let carController: CarController;

  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeAll(async () => {
    carService = {
      findAll: () => { throw new Error(); },
      create: () => { throw new Error(); },
    } as any;

    carController = new CarController(carService);

    req = {
      body: {},
      params: {},
      query: {
        limit: undefined,
        offset: undefined,
      },
    } as any;

    res = jest.fn().mockReturnValue({
      send: jest.fn().mockReturnValue({}),
      status: jest.fn().mockReturnValue({}),
      json: jest.fn().mockReturnValue({}),
      end: jest.fn(),
    }) as any;

    next = (err?: any) => err;
  });

  it('should call next with error on create', async () => {
    expect(await carController.create(req, res, next))
      .toBeInstanceOf(Error);
  });

  it('should call next with error on findAll', async () => {
    expect(await carController.findAll(req, res, next))
      .toBeInstanceOf(Error);
  });
});
