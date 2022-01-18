module.exports = class TutorialController {
    static async TutorialBySubjectController(req, res, next) {
        try {
            const language_slug = req.params.language_slug

            const language_id = await req.db.language.findOne({
                raw: true,
                where: {
                    language_slug: language_slug
                },
            })

            console.log(language_id);

            if (!language_id) {
                res.render("404")
                return;
            }else{
                const tutorials = await req.db.tutorial.findAll({
                    raw: true,
                    where: {
                        language_id: language_id.language_id,
                    },
                    order: [['updatedAt', 'ASC']]
                })

                if(tutorials[0]){
                    res.redirect(`/${language_slug}/${tutorials[0].tutorial_slug}`)
                }else{
                    res.render("404")
                }
            }
            

        } catch (error) {
            if(error.message === "Cannot read property 'language_id' of null"){
                res.render("404")
            }
            next(error)
        }   
    }
    static async TutorialGetController(req, res, next) {
        try {
            const language_slug = req.params.language_slug
            const tutorial_slug = req.params.tutorial_slug

            const language_id = await req.db.language.findOne({
                raw: true,
                where: {
                    language_slug: language_slug
                },
            })
            if (!language_id) {
                res.render("404")
            }


            const tutorials = await req.db.tutorial.findAll({
                where: {
                    tutorial_slug: tutorial_slug,
                    language_id: language_id.language_id
                }
            })

            if (tutorials.length == 0) {
                res.render("404")
            }
            
            const subjects = await req.db.subject.findAll({
                where: {
                    language_id: language_id.language_id
                },
                include: [{
                        model: req.db.language
                    },
                    {
                        model: req.db.tutorial
                    }
                ]
            })

            const data1 = []

            subjects.forEach(subject => {
                data1.push(subject.dataValues)
            })
            const data2 = []

            tutorials.forEach(tutorial => {
                data2.push(tutorial.dataValues)
            })


            res.render('tutorial', {
                tutirials: data2,
                subjects: data1
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}