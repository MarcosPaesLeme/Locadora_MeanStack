//   Classe usada para separar os tipos de requisições e assim realizar as devidas chamadas.

// Configurando o express
const express = require('express');
// Requirindo as minhas rotas de users
const userClient = require('./userClient');
// Requirindo as minhs rotas de filmes
const userEmployee = require('./userEmployee');
// Requirindo as minhas rotas de novos Usuarios
// Instanciando o meu objeto das minhas rotas
const router = express.Router();
const UserController = require('../controllers/users');
const User = require('../model/user');
const userController = new UserController(User);



// Será realizada a chamada abaixo caso seja requisitado '/users
// Ex: http://localhost:3000/userClient
router.use('/userClient', userClient);
// Será realizada a chamada abaixo caso seja requisitado '/users
// Ex: http://localhost:3000/userEmployee
router.use('/userEmployee', userEmployee);
// Criando novos usuários 
// Tela de Login que será redenrizada
router.get('/',(req,res) => res.send('Tela de Login'));
//Rota para cadastro
router.post('/', (req, res) => userController.create(req,res));





module.exports = router;