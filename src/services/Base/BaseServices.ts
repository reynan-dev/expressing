import { Response } from "express";
import { ObjectLiteral } from "typeorm";

import { DS } from "../../db.js";
import LIST_SERVICES from '../index.js'

export default abstract class BaseServices {
    path: string;
    repository: any;

    constructor(path: string, model: any) {
        this.path = path;
        this.repository = DS.getRepository(model)
    }

    async find() {
        try {
            return await this.repository.find();
        } catch (error) {
            return {};
        }
    }

    async find_by(filter = {}, res: Response) {
        try {
            if (Object.keys(filter).length == 0) {
                return res.status(401).json({
                    message: "Invalid data",
                });
            }
            return await this.repository.find(filter);
        } catch (error) {
            return {};
        }
    }

    async find_one_by(filter = {}, res: Response) {
        try {
            if (Object.keys(filter).length == 0) {
                return res.status(401).json({
                    message: "Invalid data",
                });
            }
            return await this.repository.findOneBy(filter);
        } catch (error) {
            return {};
        }
    }

    async find_relation(filter = {}, relation: string, res: Response) {
        try {

            let obj = await this.repository.findOneBy(filter);
            
            const services = Promise.all(LIST_SERVICES)
            const service = await (await services).filter(e => e.path == relation)
            
            if (Object.keys(filter).length == 0) {
                return res.status(401).json({
                    message: "Invalid data"
                }) 
            }
            
            type TWhere = {[key: string]: any}
            const filter_find: TWhere = { relations: {}, where: {}}
            const where = {id: obj.id}
            filter_find['relations'][this.path] = true
            filter_find['where'][this.path] = where
            
            return await service[0].find_by(filter_find)

        } catch (error) {
            return {}
        }
    }

    async create(data = {}, res: Response) {
        try {
            if (Object.keys(data).length == 0) {
                return res.status(401).json({
                    message: "Invalid data",
                });
            }
            
            let created = this.repository.create(data);
            return await this.repository.save(created);
        } catch (error) {
            return {};
        }
    }

    async update(id: string, data = {}, res: Response) {
        let obj = (await this.find_one_by({ id: id }, res)) as ObjectLiteral;
        try {
            if (Object.keys(data).length == 0) {
                return await res.status(401).json({
                    message: "Invalid data",
                });
            }
            this.repository.merge(obj, data);
            return await this.repository.save(obj);
        } catch (error) {
            return {};
        }
    }

    async delete(id: string) {
        try {
            return await this.repository.delete(id);
        } catch (error) {
            return {};
        }
    }
}
