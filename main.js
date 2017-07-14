// Inyección de dependencias
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');

// Inyección de archivos
let mdl = require('./model');
//let ctrl = require('./controller');
let config = require('./config');

// Inicialización de la aplicación
var app = express();

// Configuración de nuestra API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());
app.set('port', config.puerto);
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', config.domain);
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
	res.setHeader('Content-Type', 'application/json');
	next();
});

// Iniciamos las rutas de nuestro servidor/API
let rutas = express.Router();

// Ruta de bienvenida
rutas.get('/', function(req, res) {
	res.send({
		'Mensaje': 'Bienvenido a la API REST del blog de Pro-Gramadores'
	});
});

// rutas.route('/registrarse')
// 	.post(ctrl.registrarse);

// rutas.route('/login')
// 	.post(ctrl.logear);

app.use(rutas);

// Conexión con la base de datos
var promise = mongoose.connect(`mongodb://localhost/${config.nombredb}`, {
	useMongoClient: true
});

// Inicialización del servicio
app.listen(config.puerto, function() {
	console.log(`Node server ejecutandose en http://localhost:${config.puerto}`);
});