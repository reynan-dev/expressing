import { DataTypes, Model } from 'sequelize'

class School extends Model {

  static associate (models) {
    School.hasMany(models.Student, { foreignKey: 'school' })
  }
}

School.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'school',
  paranoid: true,
  timestamps: true,
})

return School