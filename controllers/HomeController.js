module.exports = class HomeController {
    static async HomeController(req, res) {
        console.log(req.url.split('/')[0]);

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
            languages   
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
