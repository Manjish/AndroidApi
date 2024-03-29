const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors=require('cors');
const multer = require('multer');

const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());

require('./DB/db');
const User = require('./model/user');
const Hospital = require('./model/hospital');
const Doctor = require('./model/doctor');
const Ambulance = require('./model/ambulance');
const Booking = require('./model/booking');
const Medicine = require('./model/medicine');
const Order = require('./model/order');
const Firstaid = require('./model/firstaid');
const auth = require('./middleware/auth');


app.use(bodyParser.urlencoded({extended:false}))
app.use("/images", express.static("images/uploads"))

app.post("/login", async function(req, res){
try{
    const user = await User.checkCrediantialsDb(req.body.username,
   req.body.password)
   console.log(req.body.username+""+req.body.password)
   console.log(user);
   if (user) {
    const token = await user.generateAuthToken(); //generateAuthToken chnage
    res.send({
      "token":token,
      "username":user.username
    });
    console.log(token)
  } else {
    res.send({"token":""})
  }
   }
   catch(e)
   {
console.log(e)
   }
  })

  app.get("/getProfile", auth, function (req, res) {
    res.send(req.user)
  })

  app.post('/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
      })
      await req.user.save()
      res.send("Done")
      } catch (e) {
      res.status(500).send()
      }
     
  })


  var ImagefileName;
var storage = multer.diskStorage({
    destination: './images/uploads',
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        ImagefileName= file.fieldname+Date.now()+ extension;
         callback(null, ImagefileName);
       
    }
});

    var imageFileFilter = (req, file, cb) => {if
        (!file.originalname.match(/\.(jpg|jpeg|PNG|png|gif)$/))
         {return cb(new Error("You can upload only image files!"), false); }
         cb(null, true);};

            var upload = multer({
                storage: storage,
                fileFilter: imageFileFilter,
                limits: {
                    fileSize: 25000000
                }
            });
            app.post('/userImageUpload', upload.single('profileImage'), (req, res) => {  //files = input type name 
              res.statusCode = 200;
              res.json({"userImageName":ImagefileName});
             })

   app.post('/registerUser', (req, res) => {
    console.log(req.body);
        var user = new User(req.body);
      user.save();
      res.json("success");
        
    });

    app.put('/updateUser/:username',(req,res)=>{
      username=req.params.username
      User.findOneAndUpdate({username:username},req.body,{new:true}).then(function(user){
        res.send(true);
      }).catch(function(e){
        res.send(e)
      })
    })

    app.get('/checkUsername/:username', function(req, res){
    
      uname = req.params.username.toString();
      console.log(uname);
      User.findOne({username:uname}).then(function(user){ 
          var usernameTaken;
          if(user) {
            usernameTaken=true;
            
          } else {
              usernameTaken=false;
             }
             console.log(usernameTaken)
          res.send(usernameTaken);
      }).catch(function(e){
       res.send(e)
      });
      });


      app.get('/getAllHospitals',auth, function (req, res) {
        Hospital.find().then(function (hospitals) {
          res.send(hospitals);
          console.log(hospitals);
        }).catch(function (e) {
          res.send(e)
        });
      });


      app.post('/addHospital',auth,(req,res)=>{
  var hospital = new Hospital(req.body);
  hospital.save();
  res.json("success");
 })

 app.post('/addDoctor',auth,(req,res)=>{
   var doctor = new Doctor(req.body);
   doctor.save();
   res.json("success");
 })

 app.post('/addMedicine',auth,(req,res)=>{
  var medicine = new Medicine(req.body);
  medicine.save();
  res.json("success");
})

 app.get('/getAllDoctors',auth, (req, res)=> {
  Doctor.find().then(function (doctors) {
    res.send(doctors);
    console.log(doctors);
  }).catch(function (e) {
    res.send(e)
  });
});

app.post('/addAmbulance',auth,(req,res)=>{
  var ambulance = new Ambulance(req.body);
  ambulance.save();
  res.json("success");
})

app.get('/getAllAmbulance',auth, (req, res)=> {
 Ambulance.find().then(function (ambulances) {
   res.send(ambulances);
   console.log(ambulances);
 }).catch(function (e) {
   res.send(e)
 });
});

app.post('/addAppointment', (req, res) => {
  console.log(req.body);
      var booking = new Booking(req.body);
    booking.save();
    res.json("success");
      
  });

  app.get('/getAllMedicine',auth, (req, res)=> {
    Medicine.find().then(function (medicines) {
      res.send(medicines);
      console.log(medicines)
    }).catch(function (e) {
      res.send(e)
    });
   });

   app.get('/getAllOrder/:username',auth, (req, res)=> {
     username = req.params.username
    Order.find({username:username}).then(function (order) {
      res.send(order);
      console.log(order)
    }).catch(function (e) {
      res.send(e)
    });
   });

   app.get('/getAllAppointments/:username',auth, (req, res)=> {
    username = req.params.username
   Booking.find({username:username}).then(function (booking) {
     res.send(booking);
     console.log(booking)
   }).catch(function (e) {
     res.send(e)
   });
  });

  app.put('/cancelAppointment/:id/:username',(req,res)=>{
    id=req.params.id
    username=req.params.username
    console.log(id)
    Booking.findByIdAndUpdate(id,{
      $set:{bookingStatus:"2"}}).then(function(){
        Booking.find({username:username}).then(function(booking){
          res.send(booking);
        }).catch(function(e){
          res.send(e)
        })
      }).catch(function(e){
        res.send(e);
      })
  })

  app.post('/addMedicineOrder', (req, res) => {
    console.log(req.body);
        var order = new Order(req.body);
      order.save();
      res.json("success");
    });

    app.post('/addFirstaid', (req, res) => {
      console.log(req.body);
          var firstaid = new Firstaid(req.body);
        firstaid.save();
        res.json("success");
      });

      app.get('/getAllFirstaid',(req,res)=>{
        Firstaid.find().then(function(firstaid){
          res.send(firstaid)
        }).catch((e)=>{
          res.send(e)
        })
      })
  
  module.exports = app;
  app.listen(7777);