const express = require("express")
var apartmentModel = require('../models/apartment_model')
const router = express.Router()

router.get("/",(req,res) => {
	// console.log("Inside all projects page")

	apartmentModel.find({completed_on: null}, {"apt_name":1,"apt_area":1, "_id":0}
			).sort({apt_name:1}).exec(function(err, curr_aptdata) {
		if(err){
           console.log(err);
       }
       else{
       	apartmentModel.find({completed_on: {$ne:null}}, {"apt_name":1,"apt_area":1, "_id":0}
				).sort({completed_on:-1}).exec(function(err, prev_aptdata) {
					if(err){console.log(err);}
       				else{
           				res.render('projects', {prev_aptdata: prev_aptdata, curr_aptdata: curr_aptdata})
       				}
       		 })
        }
	})
})

router.get("/test",(req,res) => {
	res.render('test')	
})


router.get("/:aptname",(req,res) => {
	console.log(`Inside ${req.params.aptname} page`)

	apartmentModel.find({apt_name: req.params.aptname}).exec(function(err, data) {
		if(err){console.log(err);}
		else{
			res.render('apartment',data[0])
		}
    })
})


module.exports = router