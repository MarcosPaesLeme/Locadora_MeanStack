const reserva = require('../model/reservas');

exports.insere = async(newReserva) => {
    let novaReserva = new reserva(newReserva);
    return novaReserva.save();
};

exports.getReservas = async() => {
    return await reserva.find({});
}

exports.putReserva = async(reserva) => {
    return await reserva.findByIdAndUpdate({_id:reserva})
    .then( _reserva => { 
        _reserva.status = 1
        _reserva.save();
    }); 
}

exports.getReservaDoId = async(idUser) => {
    console.log('Cheguei no crud', )
    return await reserva.find({ idUsuario:idUser });
}

