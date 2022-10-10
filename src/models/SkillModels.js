import { Column, Entity, ManyToMany } from 'typeorm'

import BaseModels from './Base/BaseModels.js'
import Wilder from './WilderModels.js'

@Entity()
export default class Skill extends BaseModels {
  @Column()
    skill

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
    wilders
}
