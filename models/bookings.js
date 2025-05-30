import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Bookings extends Model {
    static associate(models) {
      Bookings.belongsTo(models.Vehicles, {
        foreignKey: "vehicle_id",
        as: "vehicle",
        onDelete: "CASCADE",
      });
    }
  }

  Bookings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_of_wheel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Bookings",
      tableName: "bookings",
      timestamps: true,
    }
  );

  return Bookings;
};
