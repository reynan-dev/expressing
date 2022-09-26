import { Response } from "express";
import { ObjectLiteral } from "typeorm";

import BaseServices from "./Base/BaseServices.js";
import School from "../models/School.js";

class SchoolServices extends BaseServices {
    constructor() {
        super("schools", School);
    }

}

export default new SchoolServices();
