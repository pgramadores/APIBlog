var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Usuario', new Schema({
    Correo: String,
    Contrasena: String
}));

module.exports = mongoose.model('Persona', new Schema({
    Nombres: String,
    Apellidos: String,
    Correo: String,
    CorreoPublico: String,
    PerfilBlog: String,
    SitioWeb: String,
    RedesSociales: Array
}));

module.exports = mongoose.model('Blog', new Schema ({
	TituloPublicacion: String,
	FechaHoraPublicacion: Date,
	NombreEditor: String,
	ApellidoEditor: String,
	CorreoEditor: String,
	Publicacion: String,
	EstadoPublicacion: Boolean,
	TagPublicacion: Array
}));