import BaseServices from './Base/BaseServices.js';
import Student from '../models/StudentModels.js';
import SkillServices from './SkillServices.js';

class StudentServices extends BaseServices {
  constructor() {
    super('students', Student);
  }

  async create(data = {}) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data');
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

  async update(id, data = {}) {
    const obj = (await this.find_one_by({ id }));
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data');
      }

      if (data.skills) {
        const skills = await this.add_skill(data.skills);
        data.skills = skills;
      }

      this.repository.merge(obj, data);
      return this.repository.save(obj);
    } catch (error) {
      return error;
    }
  }

  add_skill(skills) {
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
