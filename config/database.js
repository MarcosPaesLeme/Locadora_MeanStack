//Importando as configurações inciadas
const config = require('config');
//Importando mongoose para o projeto.
const mongoose = require('mongoose');
//Especifícando qual biblioteca de promises será utilizada.
mongoose.Promise = require('bluebird');
//Armazenando a url do banco de dados na variável url.
//Fazendo a config para pegar a config do mongo do arquivo config
const uri = config.get('database.mongoUrl');
//Função que retorna a conexão com o banco de dados.
const connect = () => mongoose.connect(uri,{ useNewUrlParser: true });

//Exportando módulo de conexão com o banco de dados.
module.exports = {
    connect
}