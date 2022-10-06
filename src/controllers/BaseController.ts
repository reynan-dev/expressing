import { Request, Response } from "express";
import { ObjectLiteral } from "typeorm";

import LIST_SERVICES from "../services/index.js";

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
        return res.status(404).json({
          message: "Not found",
        });
      }
      return res.status(200).json({
        data: obj,
        message: "Successfuly found",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something was wrong",
      });
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
        return res.status(404).json({
          message: "Not found",
        });
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly found",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something was wrong",
      });
    }
  };

  store = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      let obj = await this.service.create(data, res);

      if (Object.keys(obj).length == 0) {
        return res.status(400).json({
          message: "Error during creation",
        });
      }

      return res.status(201).json({
        data: obj,
        message: "Successfuly created.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something was wrong",
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
      let obj = await this.service.update(id, data, res);

      if (Object.keys(obj).length == 0) {
        return res.status(500).json({
          message: "Error during update",
        });
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly updated",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something is wrong",
      });
    }
  };

  destroy = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      let obj = await this.service.delete(id);

      if (Object.keys(obj).length == 0) {
        return res.status(500).json({
          message: "Error during deletion",
        });
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly deleted",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something was wrong",
      });
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
        return res.status(404).json({
          message: "Not found",
        });
      }

      return res.status(200).json({
        data: obj,
        message: "Successfuly found",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something was wrong",
      });
    }
  };
}

export default LIST_SERVICES.map(async (promise) => {
  const service = await promise;
  return new Controller(service.path, service);
});
