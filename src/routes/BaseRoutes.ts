import body_parser from 'body-parser'
import { NextFunction, Request, Response, Router } from 'express'
import { Application } from 'express-serve-static-core'

import CONTROLLERS from '../controllers/BaseController.js'

const router = Router()

CONTROLLERS.map(async (promise) => {
  const controller = await promise

  router.get(`/${controller.path}`, controller.index)
  router.get(`/${controller.path}/:id`, controller.show)
  router.post(`/${controller.path}`, controller.store)
  router.put(`/${controller.path}/:id`, controller.update)
  router.delete(`/${controller.path}/:id`, controller.destroy)
  router.get(`/${controller.path}/:id/:relation`, controller.relations)
})

export default (app: Application) => {
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.set('X-Powered-By', 'PHP/7.1.7')
    next()
  })
  app.use(body_parser.json())
  app.use(router)
}
