const User = require('../model/user');

exports.insereUser = async(newUser) => {
    let usuario = new User(newUser);
    return usuario.save();
};

exports.trasUsuarios = async() => {
    return await User.find({});
};

exports.authenticate = async(data) => {
    return await User.findOne({
        email: data.email,
        senha: data.senha
    });
}

exports.getById = async(id) => {
    return await User.findOne({id});
}