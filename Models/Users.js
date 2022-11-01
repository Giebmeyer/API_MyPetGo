const { Model } = require('Sequelize');
const Sequelize = require('Sequelize');
const db = require('./database');

const User = db.define('Usuarios',{
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
    Usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Senha: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    Token: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = User;

User.sync()