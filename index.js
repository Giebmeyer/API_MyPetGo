const quests = require('./Jsons/Quest.json');
const users = require('./Jsons/Users.json');

const express = require('express');
const { response } = require('express');
const server = express();

const db = require('./Models/database.js');

const Client = require('./Models/Clients');
const User = require('./Models/Users');
const Quest = require('./Models/Quests');
const Quests_Annotation = require('./Models/Quests_Annotation');
const Pet = require('./Models/Pets');
const Andress = require('./Models/Andress');

const nodemailer = require('nodemailer');

let error = "";



function sendEmail(emailTo, petName, oldStatus, newStatus) {
    var remetente = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "aa0d4e8d7bde4c",
            pass: "e4c348b6c243e6"
        }
    });

    var emailASerEnviado = {

        from: "ESPy.EnviaEmail@gmail.com",

        to: emailTo,

        subject: "MyPetGo - Alteração de Status",

        text: `Olá!\n\nVenho aqui avisar que o status da viagem do seu bichinho ${petName} acabou de atualizar de "${oldStatus}" para "${newStatus}"`,

    };

    remetente.sendMail(emailASerEnviado, function (error) {

        if (error) {

            console.log(error);

        } else {

            console.log("Email enviado com sucesso.");

        }

    });

}

server.post('/validateToken/:token', async (require, response) => {
    console.log("Post Token Requisitado!");

    const token = require.params.token;

    if (token == null && token == null) {
        error = "Token  is null or Empty";
        return response.json(error);
    } else {
        let user = await User.findAll(
            {
                where: {
                    Token: token
                }
            });
        user = JSON.parse(JSON.stringify(user, null, 2));
    
        if (user[0]) {
            response.json(user[0]);
        } else {
            error = "User not found";
            return response.json(error);
        }
    }
});


server.post('/Logins/:user/:password', (require, response) => {
    console.log("Post Login Requisitado!");

    const username = require.params.user;
    const password = require.params.password;

    if (username == null && username == "" & password == null && password == "") {
        error = "Username or Password is null or Empty";
        return response.json(error);
    } else {
        let index = users.findIndex(user => user.Usuario == username && user.Senha == password);
        if (index >= 0 && index != null && index != undefined) {
            return response.json(users[index]);
        } else {
            error = "User not found";
            return response.json(error);
        }
    }
});

server.post('/Login/:user/:password', async (require, response) => {
    console.log("Post Login Requisitado!");

    const username = require.params.user;
    const password = require.params.password;
    let user = await User.findAll(
        {
            where: {
                usuario: username,
                senha: password,
            }
        });
    user = JSON.parse(JSON.stringify(user, null, 2));

    if (user[0]) {
        response.json(user[0]);
    } else {
        error = "User not found";
        return response.json(error);
    }

});


server.post('/postAnnotation/:idQuest/:Annotation', async (require, response) => {
    console.log("Post anotação Requisitado!");

    const idQuest = require.params.idQuest;
    const anotationQuest = require.params.Annotation;

    let quest = await Quest.findAll(
        {
            where: {
                Id: idQuest,
            }
        });

    quest = JSON.parse(JSON.stringify(quest, null, 2));
    console.log(quest);
    if (quest[0]) {
        Quests_Annotation.create({ "Anotacao": anotationQuest, "QuestId": idQuest })
        return response.json("Anotação criada!");
    } else {
        quest = "Quest not found";
        return response.json(error);
    }

});


server.get('/getAnnotation/:idQuest', async (require, response) => {
    console.log("Req. recebido!");
    const idQuest = require.params.idQuest

    let QuestsAnnotation = await Quests_Annotation.findAll({
        where: {
            QuestId: idQuest
        }
    });


    return response.json(QuestsAnnotation);

});


server.get('/quests', (require, response) => {
    console.log("Req. recebido!");
    return response.json(quests);
});

server.get('/quest', async (require, response) => {
    console.log("Req. recebido!");

    let quest = await Quest.findAll();
    let finalQuest = [];
    let andress;
    let annotationsQuest = [];

    for (let i = 1; i <= quest.length; i++) {
        if (Quest.findByPk(i, { include: [Pet, Client] })) {
            andress = await Andress.findByPk(i, { include: [Client] })
            annotationsQuest = await Quests_Annotation.findAll({
                where: {
                    QuestId: i
                }
            })
            finalQuest.push({ "Quest": await Quest.findByPk(i, { include: [Pet] }), "Endereco": andress, "Anotacoes": annotationsQuest });
            console.log("indice I: ", i, " retorno: ", finalQuest);
        }
    }


    JSON.parse(JSON.stringify(finalQuest, null, 0));

    return response.json(finalQuest);

});

server.post('/quests/StatusModify/:id/:status', (require, response) => {

    console.log("Put Requisitado!");

    const QuestID = require.params.id;
    const QuestStatus = require.params.status;

    if (QuestID == null || QuestID == "") {
        error = "Quest id null or Empty";
        return response.json("Return: ", error);
    } else {

        let index = quests.findIndex(quest => quest.id == QuestID)
        console.log("ID",  QuestID, "Status", QuestStatus, "QUEST ACHADA: ", quests[index])
        if (index != null) {
            if (QuestStatus == "Coletado") {
                quests[index].Tarefa.Status = "Entregue";
                //sendEmail(quests[index].Responsavel.Email, quests[index].Animal.Nome, "Coletado", "Entregue");
            }
            if (QuestStatus == "Aguardando Coleta") {
                quests[index].Tarefa.Status = "Coletado";
                //sendEmail(quests[index].Responsavel.Email, quests[index].Animal.Nome, "Aguardando Coleta", "Coletado");
            }
            if(QuestStatus == "Entregue"){
                quests[index].Tarefa.Status = "Entregue";
            }
            console.log(quests[index].Tarefa.Status);
        } else {
            console.log("Index inválido: ", index);
        }



        return response.json(quests);
    }

});

server.post('/quest/StatusModify/:id/:status', async (require, response) => {

    console.log("Put Requisitado!");

    const QuestID = require.params.id;
    const QuestStatus = require.params.status;

    if (QuestID == null || QuestID == "") {
        error = "Quest id null or Empty";
        return response.json(error);
    } else {

        const quest = await Quest.findAll(
            {
                attributes: [
                    'Id',
                    'Status'
                ],
                where: {
                    Id: QuestID,
                }
            });

       
        if (quest[0]) {
            if (QuestStatus == "Coletado") {
                Quest.update({ Status: "Entregue" }, { where: { Id: quest[0].Id } });
                //sendEmail(quests[index].Responsavel.Email, quests[index].Animal.Nome ,"Coletado", "Entregue");
            }
            if (QuestStatus == "Aguardando Coleta") {
                Quest.update({ Status: "Coletado" }, { where: { Id: quest[0].Id } });
                //sendEmail(quests[index].Responsavel.Email, quests[index].Animal.Nome ,"Aguardando Coleta", "Coletado");
            }

            if(QuestStatus == "Entregue"){
                Quest.update({ Status: "Entregue" }, { where: { Id: quest[0].Id } });
            }
        } else {
            error = "Nenhum registro encontrado para esse Id";
            return response.json(error);
        }
    }

});


/*SINCRONIZADOR*/


server.get('/getUsers', async (require, response) => {
    console.log("Req. recebido!");

    let users = await User.findAll();

    return response.json(users);

});

server.get('/getClients', async (require, response) => {
    console.log("Req. recebido!");

    let clients = await Client.findAll();

    return response.json(clients);

});

server.get('/getPets', async (require, response) => {
    console.log("Req. recebido!");

    let pets = await Pet.findAll();

    return response.json(pets);

});

server.get('/getQuests', async (require, response) => {
    console.log("Req. recebido!");

    let quests = await Quest.findAll();

    return response.json(quests);

});

server.get('/getAndress', async (require, response) => {
    console.log("Req. recebido!");

    let andress = await Andress.findAll();

    return response.json(andress);

});

server.get('/getAnnotations', async (require, response) => {
    console.log("Req. recebido!");

    let annotations = await Quests_Annotation.findAll();

    return response.json(annotations);

});



server.listen(8000, () => {
    console.log("Servidor iniciado!");
});


/*
(async () => {

    try {
        const resultado = await db.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();
*/