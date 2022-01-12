const router = require("express").Router()
const { DashboardController, LoginGetController, LoginPostController, LanguagesController, LanguagesPostController, SubjectController, SubjectPostController, TutorialsController } = require("../controllers/AdminControllers")
const AuthMiddleware = require("../middlewares/authMiddleware")

router.get('/login', LoginGetController) 
router.post('/login', LoginPostController) 
router.get('/', AuthMiddleware, DashboardController) 
router.get('/languages', AuthMiddleware, LanguagesController) 
router.post('/languages', LanguagesPostController) 
router.get('/subject', AuthMiddleware, SubjectController) 
router.post('/subject', AuthMiddleware, SubjectPostController) 
router.get('/tutorials', AuthMiddleware, TutorialsController) 

module.exports = router