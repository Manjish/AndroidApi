const mongoose = require('mongoose');

const bookingschema=new mongoose.Schema({
    username: {
        type: String   
    },
    docName:{
        type:String
    },
    docType: {  
        type: String  
    },
    docHospital: {  
        type: String  
    },
    docImageName: {  
        type: String  
    },
    bookingDate: {  
        type: String  
    },
    bookingReason: {  
        type: String  
    },
    bookingStatus:{
        type:Number
    }
});

const Booking = mongoose.model('Booking',bookingschema);
module.exports = Booking