import BaseServices from "./Base/Services";
import Student from "../models/Student";

class StudentServices extends BaseServices {
  constructor() {
    super("students", Student);
  }

  async create (data = {}) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error("Invalid data");
      }

      if (data.skills) {
        const skills = await this.add_skill(data.skills);
        data.skills = skills;
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
      if (Object.keys(data).length === 0) {
        throw new Error("Invalid data");
      }

      if (data.skills) {
        const skills = await this.add_skill(data.skills);
        data.skills = skills;
      }

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

  add_skill (skills) {
    try {
      const listSkills = [];

      for (const id of skills) {
        const skill = SkillServices.find_one_by({ id });
        listSkills.push(skill);
      }
      return listSkills;
    } catch (error) {
      return error;
    }
  }
}

export default new StudentServices();