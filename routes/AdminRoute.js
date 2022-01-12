const router = require("express").Router()
const { DashboardController, LoginGetController, LoginPostController, LanguagesController, LanguagesPostController, SubjectController, TutorialsController } = require("../controllers/AdminControllers")
const AuthMiddleware = require("../middlewares/authMiddleware")

router.get('/login', LoginGetController) 
router.post('/login', LoginPostController) 
router.get('/', AuthMiddleware, DashboardController) 
router.get('/languages', AuthMiddleware, LanguagesController) 
router.post('/languages', AuthMiddleware, LanguagesPostController) 
router.get('/subject', AuthMiddleware, SubjectController) 
router.get('/tutorials', AuthMiddleware, TutorialsController) 

module.exports = router