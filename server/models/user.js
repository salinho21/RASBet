const mongoose = require('mongoose')

var userSchema = new mongoose.Schema(
  
    {
        id: String,
        email: String,
        password_hash: String,
        type: String,
        balance: String,
        bet_history :[ {
          betID: String
        }],
        balance_history: [{
          date: String,
          value: String
        }]
  });

module.exports = mongoose.model('user', userSchema)