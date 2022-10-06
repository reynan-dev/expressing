import { DataSource } from "typeorm";

export default class Database {
  private static instance: Database;
  private DS: DataSource;
  private type: any;
  private database: string;
  private entities: any[];
  private url: string | undefined;
  private host: string | undefined;
  private username: string | undefined;
  private password: string | undefined;

  private constructor(
    type: any,
    database: string,
    entities = [],
    url?: string,
    host?: string,
    username?: string,
    password?: string
  ) {
    this.type = type;
    this.database = database;
    this.entities = entities;

    if (type === "mysql" || type === "postgre" || type === "mongodb") {
      this.url = url;
      this.host = host;
      this.username = username;
      this.password = password;
    }
  }

  public static mysql(
    database_name: string,
    models = [],
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "mysql",
        database_name,
        models,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static postgre(
    database_name: string,
    models = [],
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "postgre",
        database_name,
        models,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static mongodb(
    database_name: string,
    models = [],
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "mongodb",
        database_name,
        models,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static sqlite(database_name: string, models = []): Database {
    if (!this.instance) {
      this.instance = new Database("sqlite", database_name, models);
    }
    return this.instance;
  }

  public add_entity(entity: any) {
    this.entities.push(entity);
  }

  private DataSource(): DataSource {
    if (!this.DS) {
      this.DS = new DataSource({
        type: this.type,
        database: this.database,
        synchronize: true,
        entities: this.entities,
      });
    }
    return this.DS;
  }

  public connect = async () => {
    await this.DataSource().initialize();
    console.log("Successfully connected to database");
  };
}
