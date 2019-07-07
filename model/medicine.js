const mongoose = require('mongoose');

const medicineschema=new mongoose.Schema({
    medicineName: {
        type: String   
    },
    medicineType:{
        type:String
    },
    medicineRate: {  
        type: String  
    }
});

const Medicine = mongoose.model('Medicine',medicineschema);
module.exports = Medicine