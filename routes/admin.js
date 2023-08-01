// To register new user gt to postman
// http://localhost:8080/admin/register

// {
//     "firstname":"Varun",
//     "lastname":"Anusheel",
//     "email":"svarunanusheel@gmail.com",
//     "password":"123456789",
//     "password2":"123456789"
// }


var express = require('express');
var bodyParser = require('body-parser')
var apartmentModel= require('../models/apartment_model');
var staticModel= require('../models/staticdata_model');
const User=require('../models/user_model');

var router = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const {auth} =require('../middleware/auth');


// adding new user (sign-up route)
router.post('/admin/register',function(req,res){
   // taking a user
   const newuser=new User(req.body);

   console.log(newuser);
   
  if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
   
   User.findOne({email:newuser.email},function(err,user){
       if(user) return res.status(400).json({ auth : false, message :"email exits"});

       newuser.save((err,doc)=>{
           if(err) {console.log(err);
               return res.status(400).json({ success : false});}
           res.status(200).json({
               succes:true,
               user : doc
           });
       });
   });
});


router.get('/admin/login', function(req,res){
   let token=req.cookies.auth;

   User.findByToken(token,(err,user)=>{
      if(err) return  res(err);
      if(user) return res.redirect('/admin')
 
      else{
         res.render('admin_login')
      }
   });
});


// login user
router.post('/admin/login_verification',urlencodedParser, function(req,res){
    let token=req.cookies.auth;

    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        // if(user) 
        //  {
        //     console.log('User already logged in')
        //     return res.redirect('/admin')
        //  }
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token);
                    // res.cookie('auth',user.token).json({
                    //     isAuth : true,
                    //     id : user._id
                    //     ,email : user.email
                    // });
                    return res.redirect('/admin')
                });    
            });
          });
        }
    });
});


 router.get('/logout',auth,function(req,res){
   req.user.deleteToken(req.token,(err,user)=>{
      if(err) return res.status(400).send(err);
   });
   res.redirect('admin/login')
}); 


router.get('/admin', function(req,res){

   let token=req.cookies.auth;
   User.findByToken(token,(err,user)=>{
      if(err) return  res(err);

      if(user){
         apartmentModel.find({}).sort({apt_name:1}).exec(function(err, data) {
            if(err){
                 console.log(err);
             }
             else{
               staticModel.find({},{ "_id":0, "apt_list":0}).exec(function(err, staticData){
                  res.render('admin',{aptdata: data, staticdata: staticData[0]})
               })
            }
         })
      }
 
      else{
         res.redirect('admin/login')
      }
   });
});


router.post('/admin/create_apt',urlencodedParser, function(req, res){

   const aptData = new apartmentModel({
        apt_name: req.body.apt_name,
        apt_area: req.body.apt_area,
        about_apt: req.body.about_apt,
        apt_address: req.body.apt_address,
        gmap_link: req.body.gmap_link,
        total_flats: req.body.total_flats,
        completed_on: req.body.completed_on,
        brochure: req.body.brochure,
        images: {
           img1: req.body.image1_link,
           img2: req.body.image2_link,
           img3: req.body.image3_link,
           img4: req.body.image4_link,
           img5: req.body.image5_link,
           img6: req.body.image6_link,
        }
    })

   // console.log(req.body);
   aptData.save(function(err, data){
      if (err) throw err;
      console.log("New apt record was created");
   });
   res.redirect('/user_confirmation')
});


router.post('/admin/update_main_page',urlencodedParser, function(req, res){

   staticModel.updateOne({}, req.body, function(err, res) {
      if (err) throw err;
      console.log("Static Data Updated!!")
   })
   res.redirect('/user_confirmation')
})



router.get('/admin/edit_'+':find_apt', urlencodedParser, function(req, res){

   apartmentModel.find({apt_name: req.params.find_apt},{ "_id":0}).exec(function(err, data) {
      if(err){
           console.log(err);
       }
       else{
         // console.log(data[0].completed_on.toISOString().substring(0, 10))
         res.render('edit_apt',{data:data[0]})
      }
   })

})

router.post('/admin/update_'+':find_apt',urlencodedParser, function(req, res){

   apartmentModel.updateOne({apt_name: req.params.find_apt}, {$set: {
        apt_name: req.body.apt_name,
        apt_area: req.body.apt_area,
        about_apt: req.body.about_apt,
        apt_address: req.body.apt_address,
        gmap_link: req.body.gmap_link,
        total_flats: req.body.total_flats,
        completed_on: req.body.completed_on,
        brochure: req.body.brochure,
        images: {
           img1: req.body.image1_link,
           img2: req.body.image2_link,
           img3: req.body.image3_link,
           img4: req.body.image4_link,
           img5: req.body.image5_link,
           img6: req.body.image6_link,
        }
    }}, function(err, res) {
      if (err) throw err;
      console.log(req.params.find_apt + " Updated!!")
   })
   res.redirect('/user_confirmation')
   
});

router.get('/admin/delete_'+':find_apt', urlencodedParser, function(req, res){

   apartmentModel.deleteOne({apt_name: req.params.find_apt}).exec(function(err, data) {
      if(err){
           console.log(err);
       }
       else{
         console.log(req.params.find_apt + ' data deleted')
      }
   })

   res.redirect('/user_confirmation')

})

router.get('/user_confirmation', urlencodedParser, function(req, res){

   res.render('user_confirmation')

})

module.exports = router;