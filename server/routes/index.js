// Roteador do servidor API
var express = require('express');
var router = express.Router();
const Bet = require('../controllers/betController')
const Event = require('../controllers/eventController')
const User = require('../controllers/userController')

// Listar todas as bets
router.get('/bet', function(req, res) {
  Bet.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

// Listar todos os eventos
router.get('/event', function(req, res) {
  Event.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

// Listar todos os utilizadores
router.get('/user', function(req, res) {
  User.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar uma bet por id
router.get('/bet/:id', function(req, res) {
  Bet.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar um evento por id
router.get('/event/:id', function(req, res) {
  Event.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar um user por id
router.get('/user/:id', function(req, res) {
  User.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Inserir uma bet
router.post('/bet', function(req, res){
  Bet.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Inserir um event
router.post('/event', function(req, res){
  Event.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Inserir um user
router.post('/user', function(req, res){
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Editar uma bet
router.put('/bet', function(req, res){
  Bet.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Editar um event
router.put('/event', function(req, res){
  Event.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Editar um user
router.put('/user', function(req, res){
  User.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remover uma bet
router.delete('/bet/:id', function(req, res) {
  Bet.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Remover um dominio
router.delete('/event/:id', function(req, res) {
  Event.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Remover um dominio
router.delete('/user/:id', function(req, res) {
  User.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;