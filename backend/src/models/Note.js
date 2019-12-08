const DataTypes = require('sequelize')

const types = {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING }
}

/**
* @param {import('sequelize').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
*/
const create = (sequelize, DataTypes) => {
    const Note = sequelize.define('note', types)

    return Note
}

module.exports = create