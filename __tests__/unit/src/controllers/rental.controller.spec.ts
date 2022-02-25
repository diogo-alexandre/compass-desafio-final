import { NextFunction, Request } from 'express';

import RentalController from '../../../../src/controllers/rental.controller';
import { Response } from '../../../../src/helpers/interfaces/response.interface';
import RentalService from '../../../../src/services/rental.service';

describe('Unit test Car Controller', () => {
  let rentalService: RentalService;
  let rentalController: RentalController;

  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeAll(async () => {
    rentalService = {
      findAll: () => { throw new Error(); },
    } as any;

    rentalController = new RentalController(rentalService);

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

  it('should call next with error on findAll', async () => {
    expect(await rentalController.findAll(req, res, next))
      .toBeInstanceOf(Error);
  });
});
