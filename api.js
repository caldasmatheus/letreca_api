const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = express();
const port = 3000;
const router = express.Router();
var serverIndex = require('serve-index');

const contextoRouter = require('./router/contexto/contextoRouter');
const desafioRouter = require('./router/desafio/desafioRouter');

const express2 = _interopRequireDefault(express);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

api.use(cors());

api.use(bodyparser.urlencoded({extended: true}));
api.use(bodyparser.json());

router.get("/", (req, res) => res.json({
    mensagem: 'API ONLINE!'
}));

//api.use('/static', express.static('images'), serverIndex('images', {'icons': true}));

api.use('/', contextoRouter);
api.use('/', desafioRouter);
api.use(express.static(__dirname + '/'));
//api.use('/static', serverIndex(__dirname + '/public/images'))


//api.use('/', usuariosRouter);
//api.use('/',produtos', produtosRouter);

api.listen(port);
console.log('API INICIALIZADA COM SUCESSO!');