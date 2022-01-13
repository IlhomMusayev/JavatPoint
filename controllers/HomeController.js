module.exports = class HomeController {
    static async HomeController(req, res) {
        const languages = await req.db.language.findAll({
            raw: true,
            include: [
                {
                    model: req.db.subject,
                },
                {
                    model: req.db.tutorial,
                },
            ]
        });
        console.log(languages);
        res.render('index', {
        })
    }
}