import { Request, Response } from "express";
import { ObjectLiteral } from "typeorm";

import LIST_SERVICES from "../services/index.js";
import { getErrorMessage } from "../utils";

class Controller {
  service: any;
  path: string;

  constructor(path: string, service: any) {
    this.path = path;
    this.service = service;
  }

  index = async (_req: Request, res: Response) => {
    try {
      let obj = await this.service.find();

      if (Object.keys(obj).length == 0) {
        throw new Error("Not found");
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly found",
      });

    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  show = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      let obj = (await this.service.find_one_by(
        { id: id },
        res
      )) as ObjectLiteral;

      if (Object.keys(obj).length == 0) {
        throw new Error("Not found");
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly found",
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  store = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      let obj = await this.service.create(data, res);

      if (Object.keys(obj).length == 0) {
        throw new Error("Not found");
      }

      return res.status(201).json({
        data: obj,
        message: "Successfuly created.",
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
      let obj = await this.service.update(id, data, res);

      if (Object.keys(obj).length == 0) {
        throw new Error("Not found");
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly updated",
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  destroy = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      let obj = await this.service.delete(id);

      if (Object.keys(obj).length == 0) {
        throw new Error("Not found");
      }

      return res.status(204).json({
        message: "Successfuly deleted",
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  relations = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { relation } = req.params;

    try {
      let obj = (await this.service.find_relation(
        { id: id },
        relation,
        res
      )) as ObjectLiteral;

      if (Object.keys(obj).length == 0) {
        throw new Error("Not found");
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly found",
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  catch_errors = (err: unknown, res: Response) => {
    const error = getErrorMessage(err);

    switch (error) {
      case "Not found":
        return res.status(404).json({ message: error });
        break;
      case "Invalid data":
        return res.status(422).json({ message: error });
        break;
    }
  };
}

export default LIST_SERVICES.map(async (promise) => {
  const service = await promise;
  return new Controller(service.path, service);
});
