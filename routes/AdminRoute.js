const router = require("express").Router()
const { DashboardController, LoginGetController, LoginPostController, LanguagesController, LanguagesPostController, LanguagesPutController, LanguagesDeleteController, SubjectController, SubjectPostController, SubjectPutController, SubjectDeleteController, TutorialsController, TutorialsPostController, TutorialsGetSubjectByLanguageController, TutorialPutController, TutorialDeleteController } = require("../controllers/AdminControllers")
const AuthMiddleware = require("../middlewares/authMiddleware")

router.get('/login', LoginGetController) 
router.post('/login', LoginPostController) 
router.get('/', AuthMiddleware, DashboardController) 

router.get('/languages', AuthMiddleware, LanguagesController) 
router.post('/languages', LanguagesPostController) 
router.put('/languages', LanguagesPutController) 
router.post('/languages/delete', LanguagesDeleteController) 


router.get('/subject', AuthMiddleware, SubjectController) 
router.post('/subject', AuthMiddleware, SubjectPostController) 
router.put('/subject', AuthMiddleware, SubjectPutController) 
router.post('/subject/delete', SubjectDeleteController) 



router.get('/tutorials', AuthMiddleware, TutorialsController) 
router.post('/tutorials', AuthMiddleware, TutorialsPostController) 
router.get('/tutorials/:language_id', AuthMiddleware, TutorialsGetSubjectByLanguageController) 
router.put('/tutorials', AuthMiddleware, TutorialPutController) 
router.post('/tutorials/delete', TutorialDeleteController) 


router.get('/logout', (req, res, next) =>{
    res.clearCookie('token').redirect('/')
})

router.get(function (req, res) {
    res.render('404_admin')
})


module.exports = router