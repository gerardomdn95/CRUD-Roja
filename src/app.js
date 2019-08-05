const express = require('express');
const indexRoutes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Mongo URI
const db = require('./config/keys').mongoURI;

// Conexión BD
mongoose.connect(db)
    .then(() => console.log('Conectado a MongoDB 😜'))
    .catch(err => console.log('Mongo error'));

//use port 3000 unless there exists a preconfigured port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => (console.log('Servidor escuchando en el puerto 3000')));

app.use('/', indexRoutes);