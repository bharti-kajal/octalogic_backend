export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('bookings', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    vehicle_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    start_time: Sequelize.DATE,
    end_time: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('bookings');
};