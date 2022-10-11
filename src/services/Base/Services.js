const { database } = require('../../index.js');

class BaseServices {

  constructor(path, model) {
    this.path = path;
    this.repository = database[model]
  }

  find () {
    try {
      const obj = this.repository.findAll();

      if (obj === null) {
        throw new Error('Not Found.');
      }

      return obj
    } catch (error) {
      return error;
    }
  }

  find_by (filter = {}) {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data.');
      }

      const obj = this.repository.findAll(filter);

      if (obj === null) {
        throw new Error('Not Found.');
      }

      return obj
    } catch (error) {
      return error;
    }
  }

  find_one_by (filter = {}) {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data.');
      }

      const obj = this.repository.findOne(filter);

      if (obj === null) {
        throw new Error('Not Found.');
      }

      return obj
    } catch (error) {
      return error;
    }
  }

  find_relation (relation, filter = {}) {
    try {
      if (Object.keys(filter).length === 0) {
        throw new Error('Invalid data.');
      }

      const obj = this.repository.find_by(filter, { include: relation });

      if (obj === null) {
        throw new Error('Not Found.');
      }

      return obj
    } catch (error) {
      return error;
    }
  }

  create (data = {}) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data.');
      }

      const created = this.repository.create(data);

      return this.repository.save(created);
    } catch (error) {
      return error;
    }
  }

  async update (data, filter, transaction = undefined) {
    const obj = await this.find_by(filter);
    try {
      this.transaction(t => {
        obj.map(object => {

          if (transaction) {
            return this.repository.update(data, { where: { id: object.id } },
              { transaction: transaction });
          }
          return this.repository.update(data, { where: { id: object.id } })
        })
      })
    } catch (error) {
      return error;
    }
  }

  delete (id, transaction = undefined) {
    try {
      this.transaction(t => {
        if (transaction) {
          return this.repository.destroy({ where: { id: id } },
            { transaction: transaction })
        }
        return this.repository.destroy({ where: { id: id } });
      })
    } catch (error) {
      return error;
    }
  }

  async restore (filter, transaction = undefined) {
    try {
      this.transaction(t => {
        if (transaction) {
          return this.repository.restore(filter,
            { transaction: transaction });
        }

        return this.repository.restore(filter);
      })
    } catch (error) {
      return error;
    }
  }

  async transaction (transaction_function) {
    return database.sequelize.transaction(transaction_function);
  }
}

module.exports = BaseServices;