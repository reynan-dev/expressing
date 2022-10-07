import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

import BaseModels from "./Base/BaseModels.js";
import School from "./SchoolModels.js";
import Skill from "./SkillModels.js";

@Entity()
export default class Wilder extends BaseModels {
    @Column()
    username!: string;

    @ManyToOne(() => School, (school) => school.wilders, { eager: true })
    schools!: any;

    @ManyToMany(() => Skill, { eager: true })
    @JoinTable()
    skills!: Skill[];
}
