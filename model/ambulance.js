const mongoose = require('mongoose');

const ambulanceschema=new mongoose.Schema({
    ambulanceName: {
        type: String   
    },
    ambulanceAddress:{
        type:String
    },
    ambulanceContact: {  
        type: String  
    }
});

const Ambulance = mongoose.model('Ambulance',ambulanceschema);
module.exports = Ambulance