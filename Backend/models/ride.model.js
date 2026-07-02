const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true
 }, 

 captain:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'captain',

 },

 pickup: { 
    type: String, 
    required: true },

 destination: 
 { 
    type: String, 
    required: true 
},

fare:{
    type: Number,
    required: true
},

status:{
    type: String,
    enum: ['requested', 'accepted', 'pending', 'completed', 'cancelled','on_going'],
    default: 'pending'
},

duration:{
    type: Number,
},//in seconds

distance:{
    type: Number,

},//in meters

paymentID:{
    type: String,
},

orderID:{
    type: String,
},

signature:{
    type: String,   
},

otp:{
    type: String,
    select: false,
    required: true
}

})

module.exports = mongoose.model('ride', rideSchema);