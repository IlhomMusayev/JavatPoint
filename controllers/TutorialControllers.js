module.exports = class TutorialController {
    static async TutorialBySubjectController(req, res, next) {
        try {
            const language_slug = req.params.language_slug
            const tutorial_default = await req.db.tutorial.findOne({
                raw: true,
                order: [['updatedAt', 'DESC']]
            })

            const tutorial_slug = req.params.tutorial_slug || tutorial_default.tutorial_slug

            const language_id = await req.db.language.findOne({
                raw: true,
                where: {
                    language_slug: language_slug
                },
            })

            const tutorials = await req.db.tutorial.findAll({
                where: {
                    tutorial_slug: tutorial_slug,
                }
            })
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
                ],
                order: [['updatedAt', 'DESC']]
            })

            // <% tutorial.language.dataValues.forEach(language => {%> <%=language.language_slug%>  <% }) %>

            const data1 = []

            subjects.forEach(subject => {
                data1.push(subject.dataValues)
                // console.log(subject.dataValues.language.dataValues.language_slug);
            })


            data1.forEach(element => {
                console.log(element.language.dataValues.language_slug);
            });
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

            const tutorials = await req.db.tutorial.findAll({
                where: {
                    tutorial_slug: tutorial_slug,
                }
            })
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

            // <% tutorial.language.dataValues.forEach(language => {%> <%=language.language_slug%>  <% }) %>

            const data1 = []

            subjects.forEach(subject => {
                data1.push(subject.dataValues)
            })
            // //  <% tutorial.language.dataValues.forEach(language => {%> <%=language.language_slug%>  <% }) %>
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