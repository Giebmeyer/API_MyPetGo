const Sequelize = require('Sequelize');
const db = require('./database');

const Client = db.define('Cliente',{
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
    Telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CPF: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Client;

Client.sync()