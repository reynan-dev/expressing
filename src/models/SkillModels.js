import { DataTypes, Model } from 'sequelize'

class Skill extends Model {

  static associate (models) {
    Skill.belongsToMany(models.Student, { through: 'student_skill' })
  }
}

Skill.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  skill: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  modelName: 'skill',
  paranoid: true,
  timestamps: true,
})

return Skill