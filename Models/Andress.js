const Sequelize = require('Sequelize');
const db = require('./database');
const Client = require('./Clients');

const Andress = db.define('Enderecos',{
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Pais: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Cidade: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    Bairro: {
        type: Sequelize.STRING,
        allowNull: false, 
    },    
    Rua: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    Numero: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    Complemento: {
        type: Sequelize.STRING,
        allowNull: true, 
    },
    Latitude: {
        type: Sequelize.STRING,
        allowNull: true, 
    },
    Longitude: {
        type: Sequelize.STRING,
        allowNull: true, 
    },
})

Andress.belongsTo(Client, {
    constraints: true
})

module.exports = Andress;

Andress.sync()

