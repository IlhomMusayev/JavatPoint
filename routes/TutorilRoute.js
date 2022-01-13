const router = require("express").Router()
const { TutorialGetController, TutorialBySubjectController } = require("../controllers/TutorialControllers")

router.get('/:language_slug',  TutorialBySubjectController) 
router.get('/:language_slug/:subject_slug',  TutorialGetController) 

module.exports = router