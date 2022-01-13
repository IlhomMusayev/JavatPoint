module.exports = class TutorialController {
    static async TutorialGetController(req, res, next) {
       try {
            const language_slug = req.params.language_slug
            
            const language_id = await req.db.language.findOne({ 
                raw: true,
                where:{
                    language_slug: language_slug
                },
            })


            const subjects = await req.db.subject.findAll({
                where: {
                    language_id: language_id.language_id
                },
                include: [
                    {
                        model: req.db.language
                    },
                    {
                        model: req.db.tutorial
                    }
                ]
            })

            // <% tutorial.language.dataValues.forEach(language => {%> <%=language.language_slug%>  <% }) %>

            const data = []

            subjects.forEach(subject => {
                data.push(subject.dataValues)
            })
            data.forEach(item => {
                console.log(item.language.dataValues);
            })
            res.render('tutorial', {
                subjects: data
            })
       } catch (error) {
           next(error)
       }
    }
}