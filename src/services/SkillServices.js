import BaseServices from './Base/BaseServices';
import Skill from '../models/SkillModels';

class SkillServices extends BaseServices {
  constructor() {
    super('skills', Skill);
  }
}

export default new SkillServices();
