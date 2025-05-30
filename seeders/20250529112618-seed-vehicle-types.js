export const up = async (queryInterface) => {
  await queryInterface.bulkInsert('VehicleTypes', [
    { category: 'car', name: 'Hatchback', createdAt: new Date(), updatedAt: new Date() },
    { category: 'car', name: 'SUV', createdAt: new Date(), updatedAt: new Date() },
    { category: 'car', name: 'Sedan', createdAt: new Date(), updatedAt: new Date() },
    { category: 'bike', name: 'Cruiser', createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('VehicleTypes', null, {});
};
