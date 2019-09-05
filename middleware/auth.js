const jwt = require('jsonwebtoken');
var HttpStatus = require('http-status-codes');
const SECRET_ENCODING_MESSAGE = 'ggwp'
const METHOD_AUTHORIZED = "GET"
const PATH_AUTHORIZED = "/usuarios"

const auth = (req, res, next) => {
    console.log(req.path)
    if(req.method === METHOD_AUTHORIZED || req.path ===  PATH_AUTHORIZED){
        next()
    }else{
        const token = req.headers['x-access-token']
        if(token){
            jwt.verify(token, SECRET_ENCODING_MESSAGE, (error, decoded) => {
                if(error != null){
                    res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()                                    
                }
                else{
                    req.user = decoded
                    console.log(decoded);
                    res.json(decoded);
                    next()                    
                }
            })
        }else{
            res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()
        }
    }
}

module.exports = {
    chave: SECRET_ENCODING_MESSAGE,
    auth: auth
}