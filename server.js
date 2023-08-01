// alt+t to open cmd promt here in sublime text
//to run this server(or file): npm run devstart

const express = require("express")
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');

var databaseConnection = require('./database');

var staticDataModel = require('./models/staticdata_model');
var apartmentModel = require('./models/apartment_model');

var adminRouter = require('./routes/admin');
const projectRouter = require('./routes/projects')

const app = express()
const MY_PORT = 8080;

// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

app.set('view engine','ejs')
app.use(express.static('public'));


app.get('/',(req,res) =>{

	apartmentModel.find({}, {"apt_name":1,"apt_area":1, "_id":0}
			).sort({_id:-1}).limit(8).exec(function(err, aptdata) {
		if(err){
           console.log(err);
       }
       else{
           // console.log(aptdata);
           staticDataModel.updateOne( { _id : mongoose.Types.ObjectId("63eb6a44558b989cbe712cb4")},
           	{ $set: { apt_list: aptdata } }, function(err, res) {
    			if (err) throw err;
    			console.log("Apt list updated");
  			});
        }
	})

	staticDataModel.find(function(err, data) {
       if(err){
           console.log(err);
       }
       else{
           // console.log(data[0]); 
           res.render('index',data[0])
       }
   });
})

app.use('/', adminRouter);
app.use("/projects",projectRouter) //any page that starts with apartment add aptRouter to it

app.get('/:pageNotFound',(req,res) =>{
    res.render('404page')
})

// app.listen(PORT)

// listening port
const PORT=process.env.PORT||MY_PORT;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});


// GET           Read
// POST          Create
// PUT           Update
// DELETE        Delete