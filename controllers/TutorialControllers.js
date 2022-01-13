module.exports = class TutorialController {
    static async TutorialBySubjectController(req, res, next) {
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

            res.render('tutorial', {
                subjects: data
            })
       } catch (error) {
           next(error)
       }
    }

    static async TutorialGetController(req, res, next) {
        try {
             const language_slug = req.params.language_slug
             const subject_slug = req.params.subject_slug
                         
             const language_id = await req.db.language.findOne({ 
                 raw: true,
                 where:{
                     language_slug: language_slug
                 },
             })

             const subject_id = await req.db.subject.findAll({ 
                raw: true,
                where:{
                    subject_slug: subject_slug
                },
            })

             const tutorial = await req.db.tutorial.findAll({
                 where: {
                     language_id: language_id.language_id,
                     subject_id: subject_id.subject_id
                 }
             })
             console.log(tutorial);
            // //  <% tutorial.language.dataValues.forEach(language => {%> <%=language.language_slug%>  <% }) %>
 
            //  const data = []
 
            //  subjects.forEach(subject => {
            //      data.push(subject.dataValues)
            //  })
 
             res.render('tutorial', {
                //  subject: data
             })
        } catch (error) {
            next(error)
        }
     }
}