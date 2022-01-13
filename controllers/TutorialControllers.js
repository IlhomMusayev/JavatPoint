module.exports = class TutorialController {
    static async TutorialGetController(req, res, next) {
       try {
            const language_slug = req.params.language_slug
            
            const language_id = await req.db.language.findOne({ 
                raw: true,
                where:{
                    language_slug: language_slug
                }
            })


            const subjects = await req.db.subject.findAll({
                raw: true,
                where: {
                    language_id: language_id.language_id
                }
            })

            const tutorials



            console.log(subjects);

            res.render('tutorial', {
                subjects   
            })
       } catch (error) {
           next(error)
       }
    }
}