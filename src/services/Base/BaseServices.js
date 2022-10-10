import { database } from '../../index.js';
import LIST_SERVICES from '../index.js';

export default class BaseServices {
  path;
  repository;

  constructor(path, model) {
    this.path = path;
    this.repository = database[].getRepository(model);
  }

  find() {
    try {
      return this.repository.find();
      // TODO Implement Not Found return when the obj was null.
    } catch (error) {
      return error;
    }
  }

  find_by(filter = {}) {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data');
      }

      return this.repository.find(filter);
      // TODO Implement Not Found return when the obj was null.
    } catch (error) {
      return error;
    }
  }

  find_one_by(filter = {}) {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data');
      }
      return this.repository.findOneBy(filter);
      // TODO Implement Not Found return when the obj was null.
    } catch (error) {
      return error;
    }
  }

  async find_relation(relation, filter = {}) {
    try {
      const obj = await this.repository.findOneBy(filter);

      const services = Promise.all(LIST_SERVICES);
      const service = await (await services).filter((e) => e.path === relation);

      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data');
      }

      const filterFind = { relations: {}, where: {} };
      const where = { id: obj.id };
      filterFind.relations[this.path] = true;
      filterFind.where[this.path] = where;

      return service[0].find_by(filterFind);
      // TODO Implement Not Found return when the obj was null.
    } catch (error) {
      return error;
    }
  }

  create(data = {}) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data');
      }

      const created = this.repository.create(data);

      return this.repository.save(created);
    } catch (error) {
      return error;
    }
  }

  update(id, data = {}) {
    try {
      const obj = this.find_one_by({ id });

      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data');
      }

      this.repository.merge(obj, data);

      return this.repository.save(obj);
    } catch (error) {
      return error;
    }
  }

  delete(id) {
    try {
      return this.repository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
