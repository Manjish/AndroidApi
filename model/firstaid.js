const mongoose = require('mongoose');

const firstaidschema=new mongoose.Schema({
    emergencyName: {
        type: String   
    },
    emergencySymptoms:{
        type:String
    },
    emergencyTreatment: {  
        type: String  
    },
    emergencyImageName: {
        type:String
    }
});

const Firstaid = mongoose.model('Firstaid',firstaidschema);
module.exports = Firstaid