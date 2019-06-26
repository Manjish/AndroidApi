const mongoose = require('mongoose');

const doctorschema=new mongoose.Schema({
    docName: {
        type: String   
    },
    docEducation: { 
        type: String  
    },
    docHosName: {  
        type: String  
    },
    docDepartment: {  
        type: String  
    },
    docType:{
        type:String
    },
    docImage:{
        type: String
    },
    docAvailableDays:{
       type: String
    },
    docAvailableTime:{
        type: String
     }
});

const Doctor = mongoose.model('Doctor',doctorschema);
module.exports = Doctor