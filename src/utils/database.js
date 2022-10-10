export default class Database {
  static instance;

  constructor(dialect, user, password, host, port, database) {
    this.dialect = dialect;
    this.user = user;
    this.password = password;
    this.host = host;
    this.port = port;
    this.database = database;
  }

  static setup (dialect, user = '', password = '', host = '', port = '', database = '') {
    if (!this.instance) {
      this.instance = new Database(dialect, user, password, host, port, database);
    }
    return this.instance;
  }

  options (opt) {
    this.options = opt;
  }

  _associateModels (db) {
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  }

  async sync (opt = {}) {
    await this._start.sync({ force: true });
    console.log("All models were synchronized successfully.");
  }

  _start () {
    if (this.dialect === 'sqlite') {
      if (this.opt) {
        return new Sequelize('sqlite::memory:', this.opt);
      }

      return new Sequelize('sqlite::memory:');
    }
    else {
      if (this.opt) {
        return new Sequelize(`${this.dialect}://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`, this.opt);
      }
      return new Sequelize(`${this.dialect}://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`);
    }
  }

  async connect (db) {
    try {
      await this._associateModels(db);
      await this._start.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async close () {
    try {
      await this._start.close();
      console.log('Connection has been closed successfully.');
    } catch (error) {
      console.error('Unable to close the database:', error);
    }
  }
}