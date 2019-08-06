const express = require('express');
const bodyParser = require('body-parser');
const uri = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const router = require('./routes/routes');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log('Conectado a MongoDB 😜'))
    .catch(err => console.log('Mongo error'));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
