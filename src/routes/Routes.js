import bodyParser from 'body-parser';
import { Router } from 'express';

import CONTROLLERS from '../controllers/Controller';

const router = Router();

CONTROLLERS.map(async (promise) => {
  const controller = await promise;

  router.get(`/${controller.path}`, controller.index);
  router.get(`/${controller.path}/:id`, controller.show);
  router.post(`/${controller.path}`, controller.store);
  router.put(`/${controller.path}/:id`, controller.update);
  router.delete(`/${controller.path}/:id`, controller.destroy);
  router.get(`/${controller.path}/:id/:relation`, controller.relations);
});

export default (app) => {
  app.use((_req, res, next) => {
    res.set('X-Powered-By', 'PHP/7.1.7');
    next();
  });
  app.use(bodyParser.json());
  app.use(router);
};
