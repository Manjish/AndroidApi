const mongoose = require('mongoose');

const hospitalschema=new mongoose.Schema({
    hosName: {
        type: String   
    },
    hosDetails:{
        type: String
    },
    hosAddress: { 
        type: String  
    },
    hosContact: {  
        type: String  
    },
    hosEmail: {  
        type: String  
    },
    hosWebsite: {  
        type: String  
    },
    hosImage:{
        type: String
    },
    hosDepartments: [{
        department : {
            type: String,
            required: true
        }
    }]
});

const Hospital = mongoose.model('Hospital',hospitalschema);
module.exports = Hospital