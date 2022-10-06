import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { database } from "../index.js";

import BaseModels from "./Base/BaseModels.js";
import School from "./School.js";
import Skill from "./Skill.js";

@Entity()
export default class Wilder extends BaseModels {
    @Column()
    username!: string;

    @ManyToOne(() => School, (school) => school.wilders, { eager: true })
    schools!: School;

    @ManyToMany(() => Skill, { eager: true })
    @JoinTable()
    skills!: Skill[];
}

