import LIST_SERVICES from '../services/index.js';
import getErrorMessage from '../utils/error.js';

class Controller {

  constructor(path, service) {
    this.path = path;
    this.service = service;
  }

  index = async (_req, res) => {
    try {
      const obj = await this.service.find();

      return res.status(200).json({
        data: obj,
        message: 'Successfuly found',
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  show = async (req, res) => {
    const { id } = req.params;

    try {
      const obj = (await this.service.find_one_by({ id }));

      return res.status(200).json({
        data: obj,
        message: 'Successfuly found.',
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  store = async (req, res) => {
    const data = req.body;

    try {
      const obj = await this.service.create(data);

      if (Object.keys(obj).length === 0) {
        throw new Error('Something was wrong.');
      }

      return res.status(201).json({
        data: obj,
        message: 'Successfuly created.',
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {

      const obj = await this.service.update(data, { where: { id: id } });

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found.');
      }

      return res.status(200).json({
        data: obj,
        message: 'Successfuly updated.',
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  destroy = async (req, res) => {
    const { id } = req.params;

    try {
      const obj = await this.service.delete(id);

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found.');
      }

      return res.status(204).json({
        message: 'Successfuly deleted',
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  restore = async (req, res) => {
    const { id } = req.params;
    try {
      const obj = await this.service.restore({ where: { id: id } });

      if (Object.keys(obj).length === 0) {
        throw new Error('Not found.');
      }

      return res.status(200).json({
        message: 'Successfuly restored',
      });
    }
    catch (error) {
      this.catch_errors(error, res);
    }
  };

  relations = async (req, res) => {
    const { id } = req.params;
    const { relation } = req.params;

    try {
      const obj = await this.service.find_relation(relation, { id });

      return res.status(200).json({
        data: obj,
        message: 'Successfuly found',
      });
    } catch (error) {
      this.catch_errors(error, res);
    }
  };

  catch_errors = (err, res) => {
    const error = getErrorMessage(err);

    switch (error) {
      case 'Not found.':
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(404).json({ message: error });
      case 'Invalid data.':
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(422).json({ message: error });
      default:
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: 'Something was wrong.' });
    }
  };
}

export default LIST_SERVICES.map(async (promise) => {
  const service = await promise;
  return new Controller(service.path, service);
});
