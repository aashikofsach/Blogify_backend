import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('youtube_blog', 'postgres', 'Ladwa@123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
