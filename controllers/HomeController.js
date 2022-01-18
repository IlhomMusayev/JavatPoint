module.exports = class HomeController {
    static async HomeController(req, res) {
        const languages = await req.db.language.findAll({
            include: [
                {
                    model: req.db.tutorial,
                    order: [['updatedAt', 'ASC']]
                }
            ]
        });
        
        console.log(languages);
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
