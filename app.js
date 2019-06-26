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
const auth = require('./middleware/auth');


app.use(bodyParser.urlencoded({extended:false}))
app.use("/images", express.static("images/uploads"))

app.post("/login", async function(req, res){
try{
    const user = await User.checkCrediantialsDb(req.body.username,
   req.body.password)
   console.log(user);
   if (user) {
    const token = await user.generateAuthToken(); //generateAuthToken chnage
    res.send({
      "token":token
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

  app.post('/logout', auth, async (req, res) => {
    try {
      console.log("Logging out")
        req.user.tokens = []
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
  var hosName = req.body.hosName;
  console.log(req.body.hosName);
  console.log(hosName);
  var hosDetails = req.body.hosDetails;
  var hosAddress = req.body.hosAddress;
  var hosContact = req.body.hosContact;
  var hosEmail = req.body.hosEmail;
  var hosWebsite = req.body.hosWebsite;
  var hosImage = req.body.hosImage;

  var stringDept = req.body.hosDepartmentsString;
  var deptArray = stringDept.split(',');
  var hosDepartments = [];
  deptArray.forEach(element => {
    hosDepartments=hosDepartments.concat({department:element});  
  });
  console.log(hosDepartments);
  
  var hospital = new Hospital({hosName,hosDetails,hosAddress,hosContact,hosEmail,hosWebsite,hosImage,hosDepartments});
  hospital.save();
  res.json("success");
 })
  
  
  module.exports = app;
  app.listen(7777);