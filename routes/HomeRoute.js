const router = require("express").Router()
const { HomeController } = require("../controllers/HomeController")

router.get('/',  HomeController) 

router.get(function (req, res) {
    res.render('404')
})

module.exports = router