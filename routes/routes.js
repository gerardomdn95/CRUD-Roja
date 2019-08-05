const express = require('express');
const router = express.Router();

const { Pelicula } = require('../models/pelicula');

// CRUD
// Create
// Read
// Update
// Delete

// Métodos CRUD de peliculas

router.get('/', (req, res) => {
    res.status(200).send('Hola desde rutas');
});

//Primer post a la BD
router.post('/api/v1/pelicula', (req, res) => {
    const { titulo, year, descripcion, portadas, genero, director } = req.body;
    const nuevaPelicula = Pelicula({
        titulo,
        year,
        descripcion,
        portadas,
        genero,
        director
    })
    nuevaPelicula.save((err, pelicula) => {
        err ? res.status(409).send(err) : res.send(pelicula)
    })
});

//Primer GET ALL(List) de la BD
router.get('/api/v1/pelicula', (req, res) => {
    Pelicula.find().exec()
        .then(peliculas => res.status(200).send(peliculas))
        .catch(err => res.status(409).send(err))
})

//Primer GET de la BD
router.get('/api/v1/busqueda/pelicula', (req, res) => {
    const { q } = req.query
    Pelicula.find({ year: q }).exec()
        .then(peliculas => res.status(200).send(peliculas))
        .catch(err => res.status(409).send(err))
})

//Primer PUT a la BD
router.put('/api/v1/pelicula/:uid', (req, res) => {
    const { uid } = req.params
    console.log(req.body);
    Pelicula.findByIdAndUpdate(uid, { $set: req.body }, { new: true }).exec()
        .then(newPeli => res.status(201).send(newPeli))
        .catch(err => res.status(409).send(err))
})

//GET BY ID a la BD
router.get('/api/v1/pelicula/:uid', (req, res) => {
    const { uid } = req.params
    Pelicula.findById(uid).exec()
        .then(pelicula => {
            pelicula
                ? res.status(200).send(pelicula)
                : res.status(404).send({ message: 'ERROR: Pelicula no encontrada' })
        })
        .catch(err => {
            res.status(409).send(err)
        });
});

//DELETE a la BD
router.delete('/api/v1/pelicula/:uid', (req, res) => {
    const { uid } = req.params
    Pelicula.findByIdAndRemove(uid).exec()
        .then(pelicula => {
            res.status(204).send({
                message: "Pelicula borrada exitosamente",
                body: pelicula
            })
        })
        .catch(err => {
            res.status(404).send(err)
        });
});

module.exports = router;