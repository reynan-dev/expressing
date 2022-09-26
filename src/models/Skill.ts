import { Column, Entity, ManyToMany } from "typeorm";

import BaseModels from "./Base/BaseModels.js";
import Wilder from "./Wilder.js";

@Entity()
export default class Skill extends BaseModels {
    @Column()
    skill!: string;

    @ManyToMany(() => Wilder, (wilder) => wilder.skills)
    wilders!: Wilder[];
}
