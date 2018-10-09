const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const database = require('../config/database');
const app = express();
const cors = require ('cors');
const configureExpress = () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/', routes);
    app.set('usuarioToken',{token: null});
    return app;
};

module.exports = () => database.connect()
                            .then(configureExpress);
                            