// Roteador do servidor API
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const Bet = require('../controllers/betController')
const Event = require('../controllers/eventController')
const User = require('../controllers/userController')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')

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
router.get('/user', (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, 'secretkey', (error, decoded) =>{
    if (error) return res.status(401).json({
      title: 'Unauthorized'
    })
    UserModel.findOne({ _id: decoded.userId }, (error, user) => {
      if (error) return console.log(error)
      return res.status(200).json({
        title: 'User Grabbed',
        user:{
          name: user.name,
          email: user.email,
          password: user.password
        }
      })
    })
  })
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

// Registar um user
router.post('/user', function(req, res){
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    type: 'User'
  }
  User.inserir(newUser)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: 'Email in use'}))
})

// Efetuar Login de um user
router.post('/login', (req,res, next) =>{
  UserModel.findOne({ email: req.body.email }, (err, user) =>{
    if(err) return res.status(500).json({
      title: 'Server error',
      error: err
    })
    if(!user) {
      return res.status(401).json({
        title: 'User not found',
        error: 'Invalid Credentials'
      })
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({
        title: 'Login failed',
        error: 'Invalid Credentials'
      })
    }
    let token = jwt.sign({userId: user._id}, 'secretkey');
    return res.status(201).json({
      title: 'Login successful',
      token: token
    })
  })
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