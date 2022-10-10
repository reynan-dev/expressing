import { DataTypes, Model } from 'sequelize'

class Skill extends Model {

  static associate (models) {
    Skill.belongsToMany(models.Student, { through: 'student_skill' })
  }
}

Skill.init({
  skill: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'skill',
  paranoid: true,
  timestamps: true,
})

return Skill