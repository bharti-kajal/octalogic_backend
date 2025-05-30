export const up = async (queryInterface) => {

  const [types] = await queryInterface.sequelize.query(
    'SELECT id, name FROM VehicleTypes;'
  );

  const typeMap = types.reduce((map, type) => {
    map[type.name] = type.id;
    return map;
  }, {});

  await queryInterface.bulkInsert('vehicles', [
    { name: 'Maruti Alto', vehicle_type_id: typeMap['Hatchback'], createdAt: new Date(), updatedAt: new Date() },
    { name: 'Hyundai i10', vehicle_type_id: typeMap['Hatchback'], createdAt: new Date(), updatedAt: new Date() },
    { name: 'Toyota Fortuner', vehicle_type_id: typeMap['SUV'], createdAt: new Date(), updatedAt: new Date() },
    { name: 'Hyundai Creta', vehicle_type_id: typeMap['SUV'], createdAt: new Date(), updatedAt: new Date() },
    { name: 'Honda City', vehicle_type_id: typeMap['Sedan'], createdAt: new Date(), updatedAt: new Date() },
    { name: 'Hyundai Verna', vehicle_type_id: typeMap['Sedan'], createdAt: new Date(), updatedAt: new Date() },
    { name: 'Royal Enfield Classic 350', vehicle_type_id: typeMap['Cruiser'], createdAt: new Date(), updatedAt: new Date() },
    { name: 'Bajaj Avenger', vehicle_type_id: typeMap['Cruiser'], createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('vehicles', null, {});
};
