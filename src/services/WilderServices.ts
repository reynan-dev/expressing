import { Response } from "express";
import { ObjectLiteral } from "typeorm";

import Wilder from "../models/WilderModels.js";
import BaseServices from "./Base/BaseServices.js";
import SkillServices from "./SkillServices.js";

class WilderServices extends BaseServices {
  constructor() {
    super("wilders", Wilder);
  }

  async create(data: ObjectLiteral = {}, res: Response) {
    try {
      if (Object.keys(data).length == 0) {
        return res.status(401).json({
          message: "Invalid data",
        });
      }

      if (data["skills"]) {
        const skills = await this.add_skill(data["skills"], res);
        data["skills"] = skills;
      }

      let created = this.repository.create(data);
      return await this.repository.save(created);
    } catch (error) {
      return {};
    }
  }

  async update(id: string, data: ObjectLiteral = {}, res: Response) {
    let obj = (await this.find_one_by({ id: id }, res)) as ObjectLiteral;
    try {
      if (Object.keys(data).length == 0) {
        return await res.status(401).json({
          message: "Invalid data",
        });
      }

      if (data["skills"]) {
        const skills = await this.add_skill(data["skills"], res);
        data["skills"] = skills;
      }

      this.repository.merge(obj, data);
      return await this.repository.save(obj);
    } catch (error) {
      return {};
    }
  }

  async add_skill(skills: [], res: Response) {
    const list_skills = [];
    for (const id of skills) {
      let skill = await SkillServices.find_one_by({ id: id }, res);
      list_skills.push(skill);
    }
    return list_skills;
  }
}

export default new WilderServices();
