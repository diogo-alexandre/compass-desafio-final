import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import { attachControllers } from '@decorators/express';

import swaggerDoc from '../../swagger.json';
import CarController from '../controllers/car.controller';
import PeopleController from '../controllers/people.controller';
import AuthController from '../controllers/auth.controller';
import RentalController from '../controllers/rental.controller';

class V1 {
  static handle(): Router {
    const router = Router();

    attachControllers(
      router,
      [
        CarController,
        PeopleController,
        AuthController,
        RentalController,
      ],
    );

    router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    return router;
  }
}

export default V1;
