import { DataSource } from "typeorm";

export default class Database {
  private static instance: Database;
  private DS: DataSource;
  private type: any;
  private database: string;
  private static entities: any[];
  private url: string | undefined;
  private host: string | undefined;
  private username: string | undefined;
  private password: string | undefined;

  private constructor(
    type: any,
    database: string,
    url?: string,
    host?: string,
    username?: string,
    password?: string
  ) {
    this.type = type;
    this.database = database;

    if (type === "mysql" || type === "postgre" || type === "mongodb") {
      this.url = url;
      this.host = host;
      this.username = username;
      this.password = password;
    }
  }

  public static start_mysql(
    database_name: string,
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "mysql",
        database_name,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static start_postgre(
    database_name: string,
    entities: any[] = [],
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "postgre",
        database_name,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static start_mongodb(
    database_name: string,
    entities: any[] = [],
    url = "",
    host = "",
    username = "",
    password = ""
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        "mongodb",
        database_name,
        url,
        host,
        username,
        password
      );
    }
    return this.instance;
  }

  public static start_sqlite(database_name: string): Database {
    if (!this.instance) {
      this.instance = new Database("sqlite", database_name);
    }
    return this.instance;
  }

  public static new_entity(entity: any) {
    this.entities.push(entity);
  }

  public static show_entities() {
    return this.entities;
  }

  public DataSource(): DataSource {
    if (!this.DS) {
      this.DS = new DataSource({
        type: this.type,
        database: this.database,
        synchronize: true,
        entities: Database.entities,
      });
    }
    return this.DS;
  }

  public connect = async () => {
    await this.DataSource().initialize();
    console.log("Successfully connected to database");
  };
}
