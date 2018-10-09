// Importando o modulo do moongoose
const mongoose = require("mongoose");
// Pegando as estruturas do Schema
const Schema = mongoose.Schema;

//Criando a estrutura do banco
const reservaSchema = new Schema({
  tempoMinimo: {
    type: Number,
    required: true
  },
  tempoMaximo: {
    type: Number,
    required: true
  },
  valorMulta: {
    type: Number
  },
  idUsuario: {
    type: String,
    required: true
  },
  Filmes: {
    type: String
  },
  preco: {
    type: Number
  },
  status: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("reserva", reservaSchema, "reservas");
//1º E como e chamado o meu Schema
//2º Schema configurado
//3º Collection do meu banco
