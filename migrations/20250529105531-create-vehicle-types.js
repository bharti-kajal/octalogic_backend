'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VehicleTypes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VehicleTypes');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_VehicleTypes_category";'
    );
  },
};
