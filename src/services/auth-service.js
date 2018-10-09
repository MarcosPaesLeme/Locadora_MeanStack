const jwt = require ('jsonwebtoken');
const authConfig = require('../../config/auth');

exports.generateToken = async (data) => {
    
        return jwt.sign(data,authConfig.secret, {expiresIn: 86400});   

        
    /*}catch (err){
        console.log('deu ruim aqui')
        //res.sendStatus(401);
    }*/
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, authConfig.secret);
    return data;    
}

exports.authorize = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization || req.headers.authorization;
    if(!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, authConfig.secret, function (error, decoded) {
            if(error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
}

