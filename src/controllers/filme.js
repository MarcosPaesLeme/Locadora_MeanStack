const filmeRepository = require ('../repository/filme');
class FilmeController {

    constructor(Filme) {
      this.Filme = Filme;
    };
    //GETs
    async getFilmes(req, res) {
        try {
            let getAllFilmes = await filmeRepository.getFilmes();
            res.status(200).send(getAllFilmes);
        }catch(err){
            res.status(400).send(err.message);
        };
    }
    async getByNome(req, res) {
        try{
            let getFilmesByNome = await filmeRepository.getByNome(req.params.nome);
            res.status(200).send(getFilmesByNome);
        }catch(err){
            res.status(400).send({erro: err.message,nome:req.params.nome});
        };
    }
    async getByLancamento(req, res) {
        try{
            let getFilmesByLancamento = await filmeRepository.getByLancamento(req.params.lancamento);
            res.status(200).send(getFilmesByLancamento);
        }catch(err){
            res.status(400).send(err.message)
        };
    }
    async getByGenero (req, res) {
        try{
            let getFilmesByGenero = await filmeRepository.getByGenero(req.params.genero);
            res.status(200).send(getFilmesByGenero);
        }catch(err){
            res.status(400).send(err.message)
        };
    }
    async getByAtor(req, res){
        try{
            let getFilmesByAtor = await filmeRepository.getByAtor(req.params.ator);
            res.status(200).send(getFilmesByAtor);
        }catch(err){
            res.status(400).send(err.message);
        };
    }

    //POST
    async create(req, res) {
        try{
            const newMovie = new this.Filme(req.body);
            let insertFilme = await filmeRepository.createMovie(newMovie);
            res.status(201).send(insertFilme);
        }catch(err){
            res.status(400).send(err.message);
        }
    }
 }
  
  
  module.exports = FilmeController;