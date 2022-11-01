const Sequelize = require('Sequelize');
const db = require('./database');
const Client = require('./Clients');
const { ForeignKeyConstraintError } = require('Sequelize');

const Pet = db.define('Pets',{
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Especie: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Porte: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
})

Pet.belongsTo(Client, {
    constraints: true
})

module.exports = Pet;

Pet.sync()

