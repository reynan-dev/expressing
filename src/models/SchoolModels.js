import { Column, Entity, OneToMany } from 'typeorm'

import BaseModels from './Base/BaseModels.js'
import Wilder from './WilderModels.js'

@Entity()
export default class School extends BaseModels {
  @Column({ unique: true })
    school

  @Column()
    city

  @OneToMany(() => Wilder, (wilder) => wilder.schools)
    wilders
}
