const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId; //Autoincrementable de Mongo Haga el ID

const peliSchema = new Schema({
    pelicula : ObjectId,
    titulo : String,
    year : Number,
    descripcion : { 
        type : String
    },
    portadas : [String],
    genero : {
        type : String,
        enum : ['comedia', 'drama', 'terror'],
        require : 'El genero tiene que venir'
    },
    director : {
        type : String,
        default : 'Gerardo Arjona' 
    }
})

const Pelicula = mongoose.model('Pelicula', peliSchema);

module.exports  = { Pelicula }