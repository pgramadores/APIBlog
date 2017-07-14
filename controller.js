let mongoose = require('mongoose');
let User = mongoose.model('Usuario');
let jwt = require('jsonwebtoken');
let config = require('./config');

// función para ser invocada por POST
exports.registrarse = function(req, res) {

	let user = new User({
		Correo: req.body.Correo,
		Contrasena: req.body.Contrasena,
		NivelPermiso: req.body.NivelPermiso,
		EstadoUsuario: req.body.EstadoUsuario
	});

	user.save().then((data) => {
		res.json({
			error: false
		});
	}).catch((error) => {
		return res.json({
			error: true
		});
	});
};

// función para ser invocada por POST
exports.logear = function(req, res) {

	let data = {
		Correo: req.body.Correo,
		Contrasena: req.body.Contrasena,
		EstadoUsuario: true
	};

	User.findOne(data).lean().exec(function(err, user) {

		if (err) {
			return res.json({
				error: true
			});
		}

		if (!user) {
			return res.status(404).json({
				'mensaje': 'Usuario no encontrado!'
			});
		}
	});


	//Consulta de persona


	let token = jwt.sign(user, config.jwt_secreto, {
		expiresIn: config.jwt_expiracion // expires in 1 hour
	});

	res.json({
		error: false,
		token: token
	});


}

// función de seguridad para ingresar a sitios con token
exports.seguridad = function(req, res, next) {

	let token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {

		jwt.verify(token, config.jwt_secreto, function(err, decoded) {

			if (err) {
				console.log(err);
				return res.json({
					"error": true
				});
			}

			req.decoded = decoded;
			console.log(decoded);
			next(); //no error, proceed
		});

	} else {
		return res.status(403).send({
			"error": true
		});
	}
}
