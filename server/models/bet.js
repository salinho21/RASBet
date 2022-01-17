const mongoose = require('mongoose')

var betSchema = new mongoose.Schema(
  
    {
        id: String,
        user_id: String,
        type: String,
        events: [{
            eventID: String,
            sport: String,
            evento: String,
            aposta: String,
            estado: String,
            odd: String
        }],
        total_odd: String,
        bet_ammount: String,
        ganhos: String,
        state: String,
        date: String
  });

module.exports = mongoose.model('bet', betSchema)