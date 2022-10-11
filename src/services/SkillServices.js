import BaseServices from './Base/Services';
import Skill from '../models/SkillModels';

class SkillServices extends BaseServices {
  constructor() {
    super('skills', Skill);
  }
}

export default new SkillServices();
