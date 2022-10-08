import { DatabaseType, DataSource } from 'typeorm'

import Skill from '../models/SkillModels.js'
import School from '../models/SchoolModels.js'
import Wilder from '../models/WilderModels.js'

export default class Database {
  private static instance: Database
  private DS: DataSource
  // deno-lint-ignore no-explicit-any
  private readonly type: any
  private readonly database: string
  // deno-lint-ignore no-explicit-any
  private static readonly entities: any[] = []
  private readonly url: string | undefined
  private readonly host: string | undefined
  private readonly username: string | undefined
  private readonly password: string | undefined

  private constructor (
    type: DatabaseType,
    database: string,
    url?: string,
    host?: string,
    username?: string,
    password?: string
  ) {
    this.type = type
    this.database = database

    if (type === 'mysql' || type === 'postgres' || type === 'mongodb') {
      this.url = url
      this.host = host
      this.username = username
      this.password = password
    }
  }

  public static start_mysql (
    databaseName: string,
    url = '',
    host = '',
    username = '',
    password = ''
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        'mysql',
        databaseName,
        url,
        host,
        username,
        password
      )
    }
    return this.instance
  }

  public static start_postgres (
    databaseName: string,
    url = '',
    host = '',
    username = '',
    password = ''
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        'postgres',
        databaseName,
        url,
        host,
        username,
        password
      )
    }
    return this.instance
  }

  public static start_mongodb (
    databaseName: string,
    url = '',
    host = '',
    username = '',
    password = ''
  ): Database {
    if (!this.instance) {
      this.instance = new Database(
        'mongodb',
        databaseName,
        url,
        host,
        username,
        password
      )
    }
    return this.instance
  }

  public static start_sqlite (databaseName: string): Database {
    if (!this.instance) {
      this.instance = new Database('sqlite', databaseName)
    }
    return this.instance
  }

  // deno-lint-ignore no-explicit-any
  public static new_entity (entity: any) {
    Database.entities.push(entity)
  }

  public static show_entities () {
    return Database.entities
  }

  public _datasource (): DataSource {
    if (!this.DS) {
      this.DS = new DataSource({
        type: this.type,
        database: this.database,
        synchronize: true,
        entities: Database.entities
      })
    }
    return this.DS
  }

  public connect = async () => {
    await this._datasource().initialize()
    console.log('Successfully connected to database')
  }
}

Database.new_entity(Skill)
Database.new_entity(School)
Database.new_entity(Wilder)
