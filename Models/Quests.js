const Sequelize = require('Sequelize');
const db = require('./database');
const Client = require('./Clients');
const Pet = require('./Pets');

const Quest = db.define('Quests',{
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Observacao: {
        type: Sequelize.STRING,
        allowNull: true, 
    },
    Tipo: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    Status: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    FotoColeta: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    FotoEntrega: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
})

Quest.belongsTo(Client, {
    constraints: true
});

Quest.belongsTo(Pet, {
    constraints: true
});

module.exports = Quest;

Quest.sync()

