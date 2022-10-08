import { ObjectLiteral } from "typeorm";

import { database } from "../../index.js";
import LIST_SERVICES from "../index.js";

export default abstract class BaseServices {
  path: string;
  // deno-lint-ignore no-explicit-any
  repository: any;
  // deno-lint-ignore no-explicit-any
  constructor(path: string, model: any) {
    this.path = path;
    this.repository = database._datasource().getRepository(model);
  }

  async find() {
    try {
      return await this.repository.find();
    } catch (error) {
      return error;
    }
  }

  async find_by(filter = {}) {
    try {
      if (Object.keys(filter).length == 0) {
        throw new Error("Invalid data");
      }

      return await this.repository.find(filter);
    } catch (error) {
      return error;
    }
  }

  async find_one_by(filter = {}) {
    try {
      if (Object.keys(filter).length == 0) {
        throw new Error("Invalid data");
      }
      return await this.repository.findOneBy(filter);
    } catch (error) {
      return error;
    }
  }

  async find_relation(filter = {}, relation: string) {
    try {
      const obj = await this.repository.findOneBy(filter);

      const services = Promise.all(LIST_SERVICES);
      const service = await (await services).filter((e) => e.path == relation);

      if (Object.keys(filter).length == 0) {
        throw new Error("Invalid data");
      }

      type TWhere = { [key: string]: ObjectLiteral };
      const filter_find: TWhere = { relations: {}, where: {} };
      const where = { id: obj.id };
      filter_find["relations"][this.path] = true;
      filter_find["where"][this.path] = where;

      return await service[0].find_by(filter_find);
    } catch (error) {
      return error;
    }
  }

  async create(data = {}) {
    try {
      if (Object.keys(data).length == 0) {
        throw new Error("Invalid data");
      }

      const created = this.repository.create(data);

      return await this.repository.save(created);
    } catch (error) {
      return error;
    }
  }

  async update(id: string, data = {}) {
    const obj = (await this.find_one_by({ id: id })) as ObjectLiteral;
    try {
      if (Object.keys(data).length == 0) {
        throw new Error("Invalid data");
      }

      this.repository.merge(obj, data);

      return await this.repository.save(obj);
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
