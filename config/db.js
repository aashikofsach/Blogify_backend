// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('youtube_blog', 'postgres', 'Ladwa@123', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false,
// });

// export default sequelize;

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,        // database name
  process.env.POSTGRES_USER,      // username
  process.env.POSTGRES_PASSWORD,  // password
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;

