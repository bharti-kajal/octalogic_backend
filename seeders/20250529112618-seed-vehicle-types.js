export const up = async (queryInterface) => {
  await queryInterface.bulkInsert('VehicleTypes', [
    { category: 4, name: 'Hatchback', createdAt: new Date(), updatedAt: new Date() },
    { category: 4, name: 'SUV', createdAt: new Date(), updatedAt: new Date() },
    { category: 4, name: 'Sedan', createdAt: new Date(), updatedAt: new Date() },
    { category: 2, name: 'Cruiser', createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('VehicleTypes', null, {});
};
