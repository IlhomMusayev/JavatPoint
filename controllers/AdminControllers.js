module.exports = class AdminController {
    static async DashboardController(req, res) {
        res.render('admin', {
        })
    }

    static async LoginController(req, res) {
        res.render('login', {
        })
    }

    static async LoginPostController(req, res) {
        const {
            user_email,
            password
        } = req.body;

        const user = await req.db.admins.findOne({
            where: {
                user_email,
            },
            raw: true,
        });
        if (!user) {
            res.render('login', {
                errorStatus: true,
                error: 'User not found'
            });
            return;
        }
        if (!(await compareHash(password, user.user_password))) {
            res.render('login', {
                errorStatus: true,
                error: 'Invalid password'
            });
            return;
        }

        const token = genereteToken({
            id: user.user_id
        });

        
        if (!token) {
            res.render('login', {
                errorStatus: true,
                error: 'Token generate error'
            });
            return;
        }
        
        res.cookie('token', token).redirect('/')

    }

    static async LanguagesController(req, res) {
        res.render('languages', {
        })
    }

    static async SubjectController(req, res) {
        res.render('subject', {
        })
    }

    static async TutorialsController(req, res) {
        res.render('tutorials', {
        })
    }
}