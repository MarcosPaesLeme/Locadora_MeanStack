// Importando o modulo do moongoose
const mongoose = require('mongoose');
// Pegando as estruturas do Schema
const Schema = mongoose.Schema;

//Criando a estrutura do banco
const filmeSchema = new Schema ({
    nome: {
        type: String
    },
    lancamento: {
        type: String
    },
    genero: {
        type: String
    },
    ator: [{
        type: String 
    }],
    reservado: {
        type: Boolean,
        default: false
    },
    tipo: {
        type: Boolean
    },
    quantidade: {
        type: Number
    }
});

module.exports = mongoose.model('filme', filmeSchema, 'filmes');
            //1º E como e chamado o meu Schema
            //2º Schema configurado
            //3º Collection do meu banco
             


