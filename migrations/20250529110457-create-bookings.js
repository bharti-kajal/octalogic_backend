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
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    no_of_wheel: Sequelize.INTEGER,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('bookings');
};