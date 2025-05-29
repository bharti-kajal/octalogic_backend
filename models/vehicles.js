import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Vehicles extends Model {
    static associate(models) {
      // A vehicle belongs to a vehicle type
      Vehicles.belongsTo(models.VehicleTypes, {
        foreignKey: 'vehicle_type_id',
        as: 'vehicleType',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      // A vehicle can have many bookings
      Vehicles.hasMany(models.Bookings, {
        foreignKey: 'vehicle_id',
        as: 'bookings',
        onDelete: 'CASCADE',
      });
    }
  }

  Vehicles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicle_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Vehicles',
      tableName: 'vehicles',
      timestamps: true,
    }
  );

  return Vehicles;
};
