const Sequelize = require('sequelize');
require('dotenv').config();
logger = require('../utils/winston/logger');

let sequelize;


// FOR LOCAL DEPLOYMENT USING ENV VARIABLES

// sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );

// END LOCAL DEPLOY CODE


// FOR HEROKU DEPLOYMENT

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
  );

  sequelize
  .authenticate()
  .then(() => {
    logger.info({
      level: 'info',
      label: '200', 
      message: 'Connection has been established successfully.'});
  })
  .catch(err => {
    logger.error({
      level: 'error',
      label: '500', 
      message: err});
  });

// END HEROKU DEPLOY CODE

module.exports = sequelize;
