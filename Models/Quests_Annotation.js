const Sequelize = require('Sequelize');
const db = require('./database');
const Quest = require('./Quests');

const Quests_Annotation = db.define('Quests_Annotation',{
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Anotacao: {
        type: Sequelize.STRING,
        allowNull: true, 
    },
    Excluida: {
        type: Sequelize.STRING,
        defaultValue: 0,
        allowNull: true 
    },
})

Quests_Annotation.belongsTo(Quest, {
    constraints: true
});

module.exports = Quests_Annotation;

Quests_Annotation.sync()

