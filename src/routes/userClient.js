// Importando o express
const express = require('express');
// Definindo os modulos de rota
const router = express.Router();
// Classe que fará o meio campo entre o banco e a router
const FilmeController = require('../controllers/filme');
const ReservaController = require('../controllers/reservas');
const UserController = require('../controllers/users');
//Importando o meu servico de autenticação
const authService = require ('../services/auth-service');
//classe do meu banco que dará a modulra do usuário que será inserido
const Filme = require('../model/filme');
const Reserva = require('../model/reservas');
const User = require('../model/user');
// Iniciando meu controller que recebera um User"Schema" pronto
const filmeController = new FilmeController(Filme);
const reservaController = new ReservaController(Reserva);
const userController = new UserController(User);


//Pagina do userClient
router.get('/',(req,res) => res.send('Tela do Cliente'));

//Retornando todos os meus filmes
router.get('/consultasFilmes', (req, res) => filmeController.getFilmes(req,res));


//Retornando todos as suas reservas
router.get('/trazReservasDoUsuario/:idUsuario', authService.authorize , (req, res) => reservaController.getReservaById(req,res));

//Redirecionando para a rota de consulta para fazer a consulta por:
// lançamentos, nome, gênero e ator
router.get('/consultaFilmes/lancamento/:lancamento', (req, res) => filmeController.getByLancamento(req, res));
router.get('/consultaFilmes/nome/:nome', (req, res) => filmeController.getByNome(req, res));
router.get('/consultaFilmes/genero/:genero', (req, res) => filmeController.getByGenero(req, res));
router.get('/consultaFilmes/ator/:ator', (req, res) => filmeController.getByAtor(req, res));


//Inserindo no meu banco filmes
router.post('/cadastraFilme' , authService.authorize, (req, res) => filmeController.create(req,res));

//Autenticação do meu usuário
router.post('/authenticate', (req, res) => userController.autentica(req,res));
router.post('/refresh-token', authService.authorize, (req, res) => userController.refreshToken(req,res));

//Realizando o cadastro da Reserva
router.post('/cadastraReserva' , authService.authorize, (req, res) => reservaController.createReserva(req,res));


module.exports = router;