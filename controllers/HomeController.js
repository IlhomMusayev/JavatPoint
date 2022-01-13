module.exports = class HomeController {
    static async HomeController(req, res) {
        const languages = await req.db.language.findAll({
            raw: true
        });
        console.log(languages);
        res.render('index', {
            languages   
        })
    }
}