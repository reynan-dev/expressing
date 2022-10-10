import { DataTypes, Model } from 'sequelize'

class Student extends Model {

  static associate (models) {
    Student.belongsTo(models.School)
    Student.belongsToMany(models.Skill, { through: 'student_skill' })
  }
}

Student.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        args: true,
        msg: 'Invalid email',
      },
      allowNull: false,
      unique: true,
    }
  }
}, {
  sequelize,
  modelName: 'student',
  paranoid: true,
  timestamps: true,
})

return Student