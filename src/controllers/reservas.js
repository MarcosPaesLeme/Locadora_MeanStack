const reservasRepository = require('../repository/reservas');
const filmeRepository = require('../repository/filme');
const moment = require('moment');// Utilizando o módulo MOMENT.JS
const authService = require ('../services/auth-service');

class ReservaController {

    constructor(Reserva) {
        this.Reserva = Reserva;
    };

    //inserindo uma reserva
    //POST
    async createReserva(req, res) {
        console.log('Cheguei no createReserva');
        try {
            //recuperando o token
            // const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];;
            //Decodifica token
            // const data = await authService.decodeToken(token);
            //Atualizando os status do meu filme
            let filmeAlocado = req.body.Filmes;
            let trasFilme = await filmeRepository.getOneFilme(filmeAlocado);
            console.log('Cheguei no meu back ',trasFilme);
            console.log('Vendo a minha quantidade ', trasFilme.quantidade);
            if (trasFilme.quantidade === 0) {
                res.status(200).send({ "quantidade": "Não temos esse filme disponivel" });
            } else {
                console.log('ENtrei no else');
                let prazo = calculaPrazoDaReserva(trasFilme.lancamento);
                console.log('ENtrei no else, meu prazo ', prazo);
                if (/*filmeAlocado.filme > 1 && */ prazo <= 182.5)
                {
                    console.log('ENtrei no if do meu else');
                    console.log('Vendo os dados que veem na minha req2 ', req.body);
                    

                    let atualizaStatusFilmes = await filmeRepository.atualizaStatusFilme(trasFilme);
                    //Atualizando a tabela de reservas
                    let newReserva = new this.Reserva(req.body);
                    newReserva.tempoMinimo = req.body.tempoMinimo;
                    newReserva.tempoMaximo = req.body.tempoMaximo;
                    newReserva.idUsuario = req.body.idUsuario;
                    newReserva.Filmes = req.body.Filmes;
                    newReserva.preco = calcularValorDaReserva(prazo);
                    newReserva.valorMulta = 0;
                    let insereReserva = await reservasRepository.insere(newReserva);
                    res.status(200).send(insereReserva);
                }
                else{ 
                    let valor = calcularValorDaReserva(prazo);
                    trasFilme.valor = valor - (valor * 10);
                    let atualizaStatusFilmes = await filmeRepository.atualizaStatusFilme(trasFilme);
                    //Atualizando a tabela de reservas
                    let newReserva = new this.Reserva(req.body);
                    newReserva.tempoMinimo = req.body.tempoMinimo;
                    newReserva.tempoMaximo = req.body.tempoMaximo;
                    newReserva.idUsuario = req.body.idUsuario;
                    newReserva.Filmes = req.body.Filmes;
                    newReserva.preco = valor - (valor * 10);
                    newReserva.valorMulta = 0;
                    let insereReserva = await reservasRepository.insere(newReserva);
                    res.status(200).send(insereReserva);
                }
            }
        } catch(err){
            res.status(400).send(err.message);
        };
    }
    //Concretizando a minha reserva
    //PUT
    async efetivarReserva(req, res) {
        try {
            let reserva = req.body.idUsuario;
            let fazReserva = await reservasRepository.putReserva(reserva);        
            res.send(200).send(fazReserva);
        } catch (err){
            res.status(400).send(err.message);
        };
    }

    //GET
    async getReservas(req, res) {
        try {
            let trasReservas = await reservasRepository.getReservas();
            res.status(200).send(trasReservas);
        } catch (err){
            res.status(400).send(err.message)
        };
    }

    async getReservaById(req, res) {
        console.log('Cheguei no back');
        try {
            console.log('Id do user ',req.params.idUsuario);
            const idUsuario = await reservasRepository.getReservaDoId(req.params.idUsuario);
            console.log('id usuario', idUsuario);
            res.status(200).send(idUsuario);
        }catch (err) {
            res.status(400).send(err.message)
        }
    }
}

function calculaPrazoDaReserva (lancamento) {
    var dataNoBanco = lancamento; // Data de lançamento do filme
    var converteDataBanco = moment(dataNoBanco, 'DD/MM/YYYY').format('YYYY-MM-DD');// Recebe a data como foi armazenada no banco e converte
    var dataAtual = moment();// Pega sempre a data atual do sistema
    var totalDias = dataAtual.diff(converteDataBanco, 'days'); // Faz o cálculo da diferença de dias entre a data
    var prazoTotal = parseInt(totalDias);
    return prazoTotal;
 }

function calcularValorDaReserva(qtdeDias){
    if(qtdeDias <= 182.5) {
        return 14.99;
    } else if(qtdeDias <= 547.501) {
        return 7.99;
    } else if(qtdeDias > 547.501  && 1460 ) {
        return 3.99;
    } else {
        return 1.99;
    }
}

module.exports = ReservaController;