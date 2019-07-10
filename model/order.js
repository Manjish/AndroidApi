const mongoose = require('mongoose');

const orderschema=new mongoose.Schema({
    orderMedicineName: {
        type: String   
    },
    orderQuantity:{
        type:String
    },
    orderMedicineRate: {  
        type: String  
    },
    orderTotal: {  
        type: String  
    },
    orderStatus: {  
        type: String  
    },
    username: {  
        type: String  
    }
});

const Order = mongoose.model('Order',orderschema);
module.exports = Order