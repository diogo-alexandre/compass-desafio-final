import { Router } from 'express';
import V1 from './v1';

class Routes {
  static handle(): Router {
    const router = Router();
    router.use('/v1', V1.handle());

    return router;
  }
}

export default Routes;
