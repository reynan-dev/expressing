import BaseServices from './Base/Services.js';
import School from '../models/SchoolModels.js';

class SchoolServices extends BaseServices {
  constructor() {
    super('schools', School);
  }
}

export default new SchoolServices();
