const filme = require('../model/filme');

exports.getFilmes = async() => {
    return await filme.find({});
};

exports.getByNome = async(nome) => {
    return await filme.find({nome:nome});
};

exports.getByLancamento = async(lancamento) => {
    console.log("Cheguei no repository")
    return await filme.find({lancamento:lancamento});
};

exports.getByGenero = async(genero) => {
    return await filme.find({genero:genero});
};

exports.getByAtor = async(ator) => {
    return await filme.find({ator: { "$in" : ator}});
};

exports.createMovie = async (newMovie) => {
    let movie = new filme(newMovie);
    return await movie.save();
};

exports.getOneFilme = async(nome) => {
    return await filme.findOne({nome:nome});
};

exports.atualizaStatusFilme = async(statusFilme) => {
    console.log('ENtrei no atualizaStatusFilme ', statusFilme._id );
    return await filme.findOne({_id:statusFilme._id})
        .then( _filme => { 
            console.log('Encontrou um cara e me trouxe ele ',_filme);
            _filme.quantidade = _filme.quantidade - 1;
            _filme.save();
        }); 
};


