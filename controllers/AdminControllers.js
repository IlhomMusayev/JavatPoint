const { compareHash } = require('../modules/bcript')
const { genereteToken } = require('../modules/jwt')
const slug = require('slug')

const { LanguageValidation , SubjectValidation, TutorialValidation} = require('../modules/validation')

module.exports = class AdminController {
    static async DashboardController(req, res) {
        res.render('admin', {
        })
    }

    static async LoginGetController(req, res) {
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
        
        res.cookie('token', token).redirect('/admin')

    }

    static async LanguagesController(req, res, next) {
        try {
            const limit = req.query.limit || 15;
			const offset = req.query.offset - 1 || 0;

			const languages = await req.db.language.findAll({
				raw: true,
				// limit,
				// offset: offset * limit,
			});
            console.log(languages);
            res.render('languages', {
                languages
            })
        } catch (error) {
            next(error)
        }
    }
    static async LanguagesPostController(req, res, next) {
        try {
            const data = await LanguageValidation(req.body, res.error)

            const language = await req.db.language.create({
                language_name: data.language_name,
                language_slug: slug(data.language_name),
                language_status: data.status
            }) 

            res.status(201).json({
				ok: true,
				message: "Language created successfully",
                data: {
                    language
                }
			});
        } catch (error) {
           next(error)
        }

    }


    static async SubjectController(req, res) {
        const languages = await req.db.language.findAll({
            raw: true,
        });
        const subjects = await req.db.subject.findAll({
            raw: true,
        });
        res.render('subject', {
            languages,
            subjects
        })
    }

    static async SubjectPostController(req, res, next) {
        try {
            const data = await SubjectValidation(req.body, res.error)

            const subject = await req.db.subject.create({
                subject_name: data.subject_name,
                subject_slug: slug(data.subject_name),
                language_id: data.language_id
            }) 

            res.status(201).json({
				ok: true,
                data: {
                    subject
                }
			});
        } catch (error) {
           next(error)
        }
    }

    static async TutorialsController(req, res) {
        const languages = await req.db.language.findAll({
            raw: true,
        });
        const subjects = await req.db.subject.findAll({
            raw: true,
        });
        const tutorials = await req.db.tutorial.findAll({
            raw: true,
        });
        res.render('tutorials', {
            languages, 
            subjects,
            tutorials
        })
    }

    
    static async TutorialsPostController(req, res, next) {
        try {
            console.log("content" + req.body.tutorial_content);

            tinymce.init({
                selector: 'textarea',
                language: 'sv',
                language_url: '/js/sv.js',
                plugins: 'myplugin',
                external_plugins: {
                  'myplugin': '/js/myplugin/plugin.min.js'
                }
            });
            
            const data = await TutorialValidation(req.body, res.error)
            
            const tutorial = await req.db.tutorial.create({
                tutorial_name: data.tutorial_name,
                tutorial_slug: slug(data.tutorial_name),
                tutorial_content: req.body.tutorial_content,
                language_id: data.language_id,
                subject_id: data.subject_id
            }) 
    
            res.status(201).json({
                ok: true,
                message: "Tutorial created successfully",
                data: {
                    tutorial
                }
            });
        } catch (error) {
         next(error)   
        }
    }
    
    static async TutorialsGetSubjectByLanguageController(req, res, next) {
        try {
            const subject = await req.db.language.findAll({
                raw: true,
                where: {
                    language_id: req.params.language_id,
                },
                include: [
                    {
                        model: req.db.subject
                    }
                ]
            })
            res.json({
                ok: true,
                subject
            })
        } catch (error) {
            next(error)
        }
    }
}