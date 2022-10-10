import BaseServices from './Base/BaseServices.js';
import Skill from '../models/SkillModels.js';

class SkillServices extends BaseServices {
  constructor() {
    super('skills', Skill);
  }
}

export default new SkillServices();
