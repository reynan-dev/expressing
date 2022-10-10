import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export default class BaseModels {
    @PrimaryGeneratedColumn('uuid')
      id
  
    @CreateDateColumn()
      createAt
  
    @UpdateDateColumn()
      updateAt
  
    @DeleteDateColumn()
      deletedAt
  }