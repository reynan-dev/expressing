import { DataTypes, Model } from 'sequelize'
class School extends Model {

  static associate (models) {
    School.hasMany(models.Student, { foreignKey: 'school' })
  }
}

School.init({
  school: DataTypes.STRING,
  city: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'school',
  paranoid: true,
  timestamps: true,
})

return School