const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MyPetGo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });


sequelize.authenticate().then(function(){
    console.log('Conexão com o Banco de dados concluida com sucesso!');
}).catch(function(){
    console.error('Ocorreu um erro ao conectar com o banco de dados: ', error);
});
   
module.exports = sequelize;


