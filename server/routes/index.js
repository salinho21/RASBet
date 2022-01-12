// Roteador do servidor API
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const Bet = require('../controllers/betController')
const Event = require('../controllers/eventController')
const User = require('../controllers/userController')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')

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
          _id: user._id,
          name: user.name,
          email: user.email,
          balance: user.balance,
          currentCoin: user.currentCoin
        }
      })
    })
  })
});

// Registar um user
router.post('/user', function(req, res){
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    type: 'User',
    balance: {
      EUR: '0.00',
      USD: '0.00',
      GBP: '0.00',
      ADA: '0.00'
    },
    currentCoin: 'EUR'
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

// Editar um user

// Editar um user
router.put('/user', function(req, res){
  UserModel.findOne({ _id: req.body._id }, (err, user) =>{
    if(req.body.password!=null){
      if(bcrypt.compareSync(req.body.oldPassword, user.password)){
        const editUser={
          _id: req.body._id,
          password: bcrypt.hashSync(req.body.password, 10)
        }
        console.log(editUser)
        User.alterar(editUser)
        .then(dados => res.status(201).jsonp({dados: dados}))
        .catch(e => res.status(500).jsonp({error: e}))
      }
    }else{
      User.alterar(req.body)
        .then(dados => res.status(201).jsonp({dados: dados}))
        .catch(e => res.status(500).jsonp({error: e}))
    }
    
  })
  
  /**/
})


module.exports = router;