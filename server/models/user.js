const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

var userSchema = new mongoose.Schema(  
  
    {
        id: String,
        name: String,
        email: {
          unique: true,
          type: String
        },
        password: String,
        type: String,
        balance: {
          EUR: String,
          USD: String,
          GBP: String,
          ADA: String
        },
        currentCoin: String,
        bet_history :[ {
          betID: String
        }],
        balance_history: [{
          date: String,
          value: String
        }]
  });

module.exports = mongoose.model('user', userSchema)