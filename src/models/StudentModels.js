import { DataTypes, Model } from 'sequelize'

class Student extends Model {

  static associate (models) {
    Student.belongsTo(models.School)
    Student.belongsToMany(models.Skill, { through: 'student_skill' })
  }
}

Student.init({
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        args: true,
        msg: 'Invalid email',
      }
    }
  }
}, {
  sequelize,
  modelName: 'student',
  paranoid: true,
  timestamps: true,
})

return Student