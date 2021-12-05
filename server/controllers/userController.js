// Controlador para o model user

var User = require('../models/user')

// Devolve a lista de users
module.exports.listar = () => {
    return User
        .find()
        .exec()
}

module.exports.consultar = id => {
    return User
        .findOne({id: id})
        .exec()
}

module.exports.inserir = q => {
    var novo = new User(q)
    return novo.save()
}

module.exports.remover = function(id){
    return User.deleteOne({id: id})
}

module.exports.alterar = function(q){
    return User.findByIdAndUpdate({_id: q._id}, q, {new: true})
}