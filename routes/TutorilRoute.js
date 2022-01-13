const router = require("express").Router()
const { TutorialGetController } = require("../controllers/TutorialControllers")

router.get('/:language_slug',  TutorialGetController) 

module.exports = router