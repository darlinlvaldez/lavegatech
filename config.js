import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

const config = {

  // ENVIRONMENT
  MODE: process.env.MODE,
  PORT: process.env.PORT,
  PORTAL: process.env.PORTAL,

  // JWT
  SECRET_KEY:  process.env.SECRET_KEY,

  // DATABASE
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: process.env.DB_PORT,
};

export default config;