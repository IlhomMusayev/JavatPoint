const router = require("express").Router()
const { DashboardController, LoginGetController, LoginPostController, LanguagesController, LanguagesPostController, SubjectController, SubjectPostController, TutorialsController, TutorialsPostController, TutorialsGetSubjectByLanguageController } = require("../controllers/AdminControllers")
const AuthMiddleware = require("../middlewares/authMiddleware")

router.get('/login', LoginGetController) 
router.post('/login', LoginPostController) 
router.get('/', AuthMiddleware, DashboardController) 
router.get('/languages', AuthMiddleware, LanguagesController) 
router.post('/languages', LanguagesPostController) 
router.get('/subject', AuthMiddleware, SubjectController) 
router.post('/subject', AuthMiddleware, SubjectPostController) 
router.get('/tutorials', AuthMiddleware, TutorialsController) 
router.post('/tutorials', AuthMiddleware, TutorialsPostController) 
router.get('/tutorials/:language_id', AuthMiddleware, TutorialsGetSubjectByLanguageController) 

router.get(function (req, res) {
    res.render('404_admin')
})


module.exports = router