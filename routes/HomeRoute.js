const router = require("express").Router()
const { HomeController, TutorialsGetController } = require("../controllers/HomeController")

router.get('/',  HomeController) 
router.get('/api/tutorials', TutorialsGetController)


router.get(function (req, res) {
    res.render('404')
})


module.exports = router