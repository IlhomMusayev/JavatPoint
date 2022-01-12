const router = require("express").Router()
const { HomeController } = require("../controllers/HomeController")

router.get('/',  HomeController) 

module.exports = router