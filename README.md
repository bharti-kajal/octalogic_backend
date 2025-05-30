# Octalogic Backend (Vehicle Booking Form)

A modern NODE, EXPRESS, mysql2, sequalize

## Tech Stack

- Node
- ORM
- Express
- Mysql2
- Sequlize

##  Folder Structure

Octalogic_backend/
├── config/
    |-config.json
├── migration/
    ├── 20250529105531-create-vehicle-types.js
│   ├── 20250529110354-create-vehicles.js
│   ├── 20250529110457-create-bookings.js
├── models/
    │   ├── booking.js
    │   ├── index.js
    │   ├── vehicles.js
    │   ├── vehicletypes.js
├── modules/
    ├── vehicles
    │   ├── vehicle.controller.js
    │   ├── vehicle.routes.js
├── seeders/
│   ├── 20250529112618-seed-vehicle-types.js
│   ├── 20250529112850-seed-vehicles.js
├── .gitignore
├── package.json
├── README.md
├── .env
├── server.js

## Getting Started
```bash
npm install
npm start

