import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  
  class VehicleTypes extends Model {
    static associate(models) {
    }
  }

  VehicleTypes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM('car', 'bike'),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'VehicleTypes',
      tableName: 'VehicleTypes',
      timestamps: true,
      paranoid: true,
    }
  );

  return VehicleTypes;
};
