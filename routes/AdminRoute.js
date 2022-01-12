const router = require("express").Router()
const { DashboardController, LoginController, LanguagesController, SubjectController, TutorialsController } = require("../controllers/AdminControllers")

router.get('/',  DashboardController) 
router.get('/login',  LoginController) 
router.get('/languages',  LanguagesController) 
router.get('/subject',  SubjectController) 
router.get('/tutorials',  TutorialsController) 

module.exports = router