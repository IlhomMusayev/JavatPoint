const moment = require('moment')

module.exports = class HomeController {
    static async HomeController(req, res) {

        const guests = await req.db.guests.findAll({
            raw: true,
        })


        const languages = await req.db.language.findAll({
            where: {
                language_status: "active"
            },
            order: [['updatedAt', 'ASC']],
            include: [
                {
                    model: req.db.tutorial,
                    order: [['updatedAt', 'ASC']]
                }
            ]
        });
        
        res.render('index', {
            languages,
            guests: guests.length
        })
    }
    static async TutorialsGetController(req, res) {
        const tutorials = await req.db.tutorial.findAll({
            raw: true,
            include: [
                {
                    model: req.db.language
                }
            ]
        });
        res.status(200).json({
            tutorials
        })
    }
}
