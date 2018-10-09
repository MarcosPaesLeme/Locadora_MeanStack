const userRepository = require ('../repository/users');
const authService = require ('../services/auth-service');
class UsersController {

    constructor(User) {
      this.User = User;
    };
    //POST
    async create(req, res) {
        try{
            const newUser = new this.User(req.body);
            let insereUsuario = await userRepository.insereUser(newUser);
            res.status(201).send(insereUsuario);
        }catch(err){
            res.status(400).send(err.message);
        };
    }

    //GET
    async getUSers(req,res) {
        try{
            let pegaUsuarios = await userRepository.trasUsuarios();
            res.status(201).send(pegaUsuarios);
        }catch(err){
            res.status(400).send(err.message);
        };
    }

    async autentica(req, res,next) {
        //console.log("Cheguei no back "+newUser.email);
        console.log("Vendo o que vem na minha req " + JSON.stringify(req.body));
        try{
            console.log("Email :" + req.body.email);
            console.log("Senha :" + req.body.senha);
            const customer = await userRepository.authenticate({
                email: req.body.email,
                senha: req.body.senha
            });
            
            if(!customer){
                res.status(404).send({
                message: 'Usuário não encontrado!'
                });
                return;
            }
            
            const tokenreal = await authService.generateToken({
                id: customer._id,
                email: customer.email,
                senha: customer.senha
            });
            

            res.status(201).send({
                token: tokenreal,
                id: customer._id,
                email: customer.email,//caio esteve aqui
                nome: customer.nome
            });
        
        }catch(err){
            console.log(err);
            res.status(400).send(err.message);
        };
    }

    async refreshToken(req, res) {
        try{
            //recuperando o token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            //Decodifica token
            const data = await authService.decodeToken(token);
            console.log(data);
            const customer = await userRepository.authenticate(data.id);
            
            if(!customer){
                res.status(401).send({
                message: 'Cliente não encontrado!'
                });
                return;
            }
            
            const tokenreal = await authService.generateToken({
                id: customer._id,
                email: customer.email,
                senha: customer.senha
            });
            

            res.status(201).send({
                token: tokenreal,
                data: {
                    id: customer._id,
                    email: customer.email,//caio esteve aqui
                    nome: customer.nome
                }
            });
        
        }catch(err){
            res.status(400).send(err.message);
        };
    }
 }


  
  module.exports = UsersController;