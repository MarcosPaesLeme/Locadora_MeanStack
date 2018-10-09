// Importando o express
const express = require('express');
// Definindo os modulos de rota
const router = express.Router();
// Classe que fará o meio campo entre o banco e a router
const ReservaController = require('../controllers/reservas');
//classe do meu banco que dará a modulra do usuário que será inserido
const Reserva = require('../model/reservas');
// Iniciando meu controller que recebera um User"Schema" pronto
const reservaController = new ReservaController(Reserva);

//Tela do empregado
//Pagina do userClient
router.get('/',(req,res) => res.send('Tela do Empregado'));

//Inserindo no meu banco filmes
router.get('/consultaReservas' , (req, res) => reservaController.getReservas(req,res));


module.exports = router;