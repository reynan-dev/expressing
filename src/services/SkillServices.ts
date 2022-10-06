import BaseServices from "./Base/BaseServices.js";
import Skill from "../models/Skill.js";

class SkillServices extends BaseServices {
  constructor() {
    super("skills", Skill);
  }
}

export default new SkillServices();
