import BaseServices from './Base/Services';
import School from '../models/SchoolModels';

class SchoolServices extends BaseServices {
  constructor() {
    super('schools', School);
  }
}

export default new SchoolServices();
