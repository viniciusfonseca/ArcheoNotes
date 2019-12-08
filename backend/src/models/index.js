'use strict';

const fs = require('fs');
const path = require('path');
// const bcrypt = require('bcrypt')
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config/config.json'))[env];
const db = {};

/** @type {import('sequelize').Sequelize} */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

function loadModels() {

  fs.readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

}

db.init = async () => {
    // console.log(`Connecting to DB in ${SEQUELIZE_OPTS.host} on port ${SEQUELIZE_OPTS.port}`)

    try {
        await db.sequelize.authenticate()
    }
    catch (e) {
        console.error('Unable to connect to the database:', e)
        return false
    }

    loadModels()
    
    await db.sequelize.sync({ force: false })
    // try {
    //     db.salt = await bcrypt.genSalt(10)

    // }
    // catch (e) {
    //     console.error('Unable to generate BCrypt salt.', e)
    //     return false
    // }

    return true
}

module.exports = db;
