import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
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
        type: DataTypes.INTEGER,
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
