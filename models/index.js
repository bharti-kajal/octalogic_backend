import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Async read and parse config.json
const configPath = path.resolve(__dirname, '../config/config.json');
const configFile = await fs.readFile(configPath, 'utf-8');
const config = JSON.parse(configFile);
const envConfig = config[env];

const db = {};

let sequelize;
if (envConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[envConfig.use_env_variable], envConfig);
} else {
  sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
}

// Read all model files in this directory except this file and tests
const files = (await fs.readdir(__dirname)).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    !file.endsWith('.test.js')
  );
});

// Dynamically import each model file and initialize model
for (const file of files) {
  const fileUrl = pathToFileURL(path.join(__dirname, file)).href;
  const modelImport = await import(fileUrl);
  const model = modelImport.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Run associate if exists
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

export default db;
