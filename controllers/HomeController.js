module.exports = class HomeController {
    static async HomeController(req, res) {
        const languages = await req.db.language.findAll({
            include: [
                {
                    model: req.db.tutorial,
                    order: [['updatedAt', 'DESC']]
                }
            ]
        });
        
        console.log(languages);
        res.render('index', {
            languages   
        })
    }
}