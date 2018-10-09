// Importando o modulo do moongoose
const mongoose = require('mongoose');
// Pegando as estruturas do Schema
const Schema = mongoose.Schema;

//Criando a estrutura do banco
const userSchema = new Schema ({
    nome: {
        type: String
    },
    email: {
        type: String
    },
    senha: {
        type: String
    },
    tipoUsuario: {
        type: Boolean 
    }
});

module.exports = mongoose.model('user', userSchema, 'users');
            //1º E como e chamado o meu Schema
            //2º Schema configurado
            //3º Collection do meu banco
             


