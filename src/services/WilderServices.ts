import { ObjectLiteral } from 'typeorm'

import Wilder from '../models/WilderModels.js'
import BaseServices from './Base/BaseServices.js'
import SkillServices from './SkillServices.js'

class WilderServices extends BaseServices {
  constructor () {
    super('wilders', Wilder)
  }

  async create (data: ObjectLiteral = {}) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data')
      }

      if (data.skills) {
        const skills = await this.add_skill(data.skills)
        data.skills = skills
      }

      const created = this.repository.create(data)
      return this.repository.save(created)
    } catch (error) {
      return error
    }
  }

  async update (id: string, data: ObjectLiteral = {}) {
    const obj = (await this.find_one_by({ id })) as ObjectLiteral
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('Invalid data')
      }

      if (data.skills) {
        const skills = await this.add_skill(data.skills)
        data.skills = skills
      }

      this.repository.merge(obj, data)
      return this.repository.save(obj)
    } catch (error) {
      return error
    }
  }

  async add_skill (skills: []) {
    const listSkills = []
    for (const id of skills) {
      const skill = await SkillServices.find_one_by({ id })
      listSkills.push(skill)
    }
    return listSkills
  }
}

export default new WilderServices()
