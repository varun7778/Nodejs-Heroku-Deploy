//test/learning file

const express = require("express")
const router = express.Router()

//this is like if else condition goes from top to bottom
//dynamic routing should be last after static routing

router.get("/",(req,res) => {
	res.send("page 1")

})

router.get("/new",(req,res) => {
	res.send("page inside page 1")
})

router.get("/:aptname",(req,res) => { //do something based n the dynamic urls
	res.send(`Get the apt name ${req.params.aptname}`)
	console.log(req.apt)
})

// router.route
const apartments = [{name: "Pydah"}, {name:"Madhuvan"}]

//this runs first, this is middleware and next it goes to get here and req.apt canbe used anywhere
router.param("aptname",(req,res, next, aptname) => {
	req.apt = apartments[aptname]
	next()
})

module.exports = router