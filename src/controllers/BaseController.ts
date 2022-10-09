import { Request, Response } from 'express'
import { ObjectLiteral } from 'typeorm'
import BaseServices from '../services/Base/BaseServices.js'

import LIST_SERVICES from '../services/index.js'
import { getErrorMessage } from '../utils/error.js'

class Controller {
  // deno-lint-ignore no-explicit-any
  service: any
  path: string

  constructor (path: string, service: BaseServices) {
    this.path = path
    this.service = service
  }

  index = async (_req: Request, res: Response) => {
    try {
      const obj = await this.service.find()

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found')
      }

      return res.status(200).json({
        data: obj,
        message: 'Successfuly found'
      })
    } catch (error) {
      this.catch_errors(error, res)
    }
  }

  show = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const obj = (await this.service.find_one_by({ id })) as ObjectLiteral

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found')
      }

      return res.status(200).json({
        data: obj,
        message: 'Successfuly found'
      })
    } catch (error) {
      this.catch_errors(error, res)
    }
  }

  store = async (req: Request, res: Response) => {
    const data = req.body

    try {
      const obj = await this.service.create(data)

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found')
      }

      return res.status(201).json({
        data: obj,
        message: 'Successfuly created.'
      })
    } catch (error) {
      this.catch_errors(error, res)
    }
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    try {
      const obj = await this.service.update(id, data)

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found')
      }

      return res.status(200).json({
        data: obj,
        message: 'Successfuly updated'
      })
    } catch (error) {
      this.catch_errors(error, res)
    }
  }

  destroy = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const obj = await this.service.delete(id)

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found')
      }

      return res.status(204).json({
        message: 'Successfuly deleted'
      })
    } catch (error) {
      this.catch_errors(error, res)
    }
  }

  relations = async (req: Request, res: Response) => {
    const { id } = req.params
    const { relation } = req.params

    try {
      const obj = (await this.service.find_relation(
        { id },
        relation
      )) as ObjectLiteral

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found')
      }

      return res.status(200).json({
        data: obj,
        message: 'Successfuly found'
      })
    } catch (error) {
      this.catch_errors(error, res)
    }
  }

  catch_errors = (err: unknown, res: Response) => {
    const error = getErrorMessage(err)

    switch (error) {
      case 'Not found':
        console.error(error)
        return res.status(404).json({ message: error })
      case 'Invalid data':
        console.error(error)
        return res.status(422).json({ message: error })
      default:
        console.error(error)
        return res.status(500).json({ message: 'Something was wrong.' })
    }
  }
}

export default LIST_SERVICES.map(async (promise) => {
  const service = await promise
  return new Controller(service.path, service)
})
