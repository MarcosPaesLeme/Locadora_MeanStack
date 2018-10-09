// Classe responsavel por instaciar nosso servidor


// Importando o modulo para instanciar meu server
const express = require('express');
// Mostrando para o meu serviço que ele vai ter que
// transformar todas as minhas requisições
const bodyParser = require('body-parser');
// Aqui temos o nosso server pronto
const app = express();
// Direcionando meu server para a primeira ação que 
// ele vai fazer
const setupApp = require('./src/app');
// Inicializando o meu cors
var cors = require('cors');
// Determinand a porta que ele vai rodar, caso ele
// não tenha vai rodar na porta 3000
var port = process.env.PORT || 3000;
//Definindo que a conversão do body que vira da minha
// requisição sera transformada em JSON
app.use(bodyParser.json());
app.use(cors());
// Falando que ele pode converter a requisição para
app.use(bodyParser.urlencoded({ extended: false }));

setupApp()
  .then(app => app.listen(port, () => console.log(`App rodando na porta x port ${port}`)))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
