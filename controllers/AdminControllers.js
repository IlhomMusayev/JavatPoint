const {
    compareHash
} = require('../modules/bcript')
const {
    genereteToken
} = require('../modules/jwt')
const Sequelize = require('sequelize');
const moment = require('moment')
const slug = require('slug')
const path = require('path');   

const {
    LanguageValidation,
    SubjectValidation,
    TutorialValidation
} = require('../modules/validation')

module.exports = class AdminController {

    static async DashboardController(req, res) {
        const guests = await req.db.guests.findAll({
            raw: true,
        })
        let todayDatas = []

        const todayGuests = guests.map(guest => {
            if(moment(guest.createdAt).format('MMMM Do YYYY') === moment(new Date()).format('MMMM Do YYYY')){
                todayDatas.push(guest)
            }
        })

        res.render('admin', {
            guests: guests.length,
            todayGuests: todayDatas.length
        })

    }
    static async LoginGetController(req, res) {
        res.render('login', {})
    }
    static async LoginPostController(req, res, next) {
        try {
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
    
            await req.db.sessions.destroy({
                where: {
                    session_useragent: req.headers["user-agent"] || "Unknown",
                    user_id: user.user_id,
                },
            });
    
            const session = await req.db.sessions.create({
                session_useragent: req.headers["user-agent"] || "Unknown",
                user_id: user.user_id,
            });
    
    
            const token = await genereteToken({
                session_id: session.dataValues.session_id,
            });
    
    
            if (!token) {
                res.render('login', {
                    errorStatus: true,
                    error: 'Token generate error'
                });
                return;
            }
    
            res.cookie('token', token).redirect('/admin')
        } catch (error) {
            next(error)
        }

    }



    // LANGUAGE

    static async LanguagesController(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            let offset = req.query.offset - 1 || 0;
            const languageCount = await req.db.language.findAll({})
            const count = Math.ceil(languageCount.length / limit)
            if (offset < 0) {
                offset = 0
            }

            const languages = await req.db.language.findAll({
                raw: true,
                limit,
                offset: offset * limit,
                order: [
                    ['updatedAt', 'DESC']
                ]
            });
            res.render('languages', {
                languages,
                limit,
                offset,
                count
            })
        } catch (error) {
            next(error)
        }
    }
    static async LanguagesPostController(req, res, next) {
        try {
            const data = await LanguageValidation(req.body, res.error)

            const imgName = req.files.file.name.split(".")

            const filename = req.files.file.md5 + '.' + imgName[imgName.length - 1]

            const language = await req.db.language.create({
                language_name: data.language_name,
                language_slug: slug(data.language_name),
                language_status: data.status,
                language_logo: filename
            })

            req.files.file.mv(
                path.join(__dirname, '..', 'public', 'files', filename),
            )

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
    static async LanguagesPutController(req, res, next) {
        try {
            const {
                language_name,
                status,
                language_id
            } = req.body

            const language = await req.db.language.update({
                language_name: language_name,
                language_slug: slug(language_name),
                language_status: status
            }, {
                where: {
                    language_id: language_id
                }
            })


            res.status(200).json({
                ok: true,
                message: "Updated language successfully"
            })

        } catch (error) {
            next(error)
        }
    }
    static async LanguagesDeleteController(req, res, next) {
        try {
            const {
                language_id
            } = req.body


            const language = await req.db.language.destroy({
                paranoid: true,
                where: {
                    language_id: language_id
                }
            })

            res.redirect('/admin/languages')

        } catch (error) {

            next(error)
        }
    }



    // SUBJECT

    static async SubjectController(req, res) {
        const limit = req.query.limit || 10;
        let offset = req.query.offset - 1 || 0;
        const subjectCount = await req.db.subject.findAll({})
        const count = Math.ceil(subjectCount.length / limit)
        if (offset < 0) {
            offset = 0
        }

        const languages = await req.db.language.findAll({
            raw: true,
        });
        const subjects = await req.db.subject.findAll({
            raw: true,
            limit,
            offset: offset * limit,
            order: [
                ['updatedAt', 'DESC']
            ]
        });

        res.render('subject', {
            languages,
            subjects,
            count,
            limit,
            offset
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
    static async SubjectPutController(req, res, next) {
        try {
            const {
                subject_name,
                language_id,
                subject_id
            } = req.body

            const subject = await req.db.subject.update({
                subject_name: subject_name,
                subject_slug: slug(subject_name),
                language_id: language_id.trim()
            }, {
                where: {
                    subject_id: subject_id.trim()
                }
            })


            res.status(200).json({
                ok: true,
                message: "Updated subject successfully"
            })

        } catch (error) {
            next(error)
        }
    }
    static async SubjectDeleteController(req, res, next) {
        try {
            const {
                subject_id
            } = req.body


            const subject = await req.db.subject.destroy({
                paranoid: true,
                where: {
                    subject_id: subject_id.trim()
                }
            })

            res.redirect('/admin/subject')

        } catch (error) {

            next(error)
        }
    }






    // TUTORIAL

    static async TutorialsController(req, res) {
        const limit = req.query.limit || 10;
        let offset = req.query.offset - 1 || 0;
        const tutorialCount = await req.db.tutorial.findAll({})
        const count = Math.ceil(tutorialCount.length / limit)
        if (offset < 0) {
            offset = 0
        }


        const languages = await req.db.language.findAll({
            raw: true,
        });
        const subjects = await req.db.subject.findAll({
            raw: true,
        });
        const tutorials = await req.db.tutorial.findAll({
            raw: true,
            limit,
            offset: offset * limit,
            order: [
                ['updatedAt', 'DESC']
            ]
        });

        res.render('tutorials', {
            languages,
            subjects,
            tutorials,
            limit,
            count,
            offset
        })
    }
    static async TutorialsPostController(req, res, next) {
        try {

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
    static async TutorialPutController(req, res, next) {
        try {
            const {
                tutorial_name,
                language_id,
                subject_id,
                tutorial_content,
                tutorial_id
            } = req.body

            const tutorial = await req.db.tutorial.update({
                tutorial_name: tutorial_name,
                tutorial_slug: slug(tutorial_name),
                language_id: language_id.trim(),
                subject_id: subject_id.trim(),
                tutorial_content: tutorial_content
            }, {
                where: {
                    tutorial_id: tutorial_id.trim()
                }
            })


            res.status(200).json({
                ok: true,
                message: "Updated Tutorial successfully"
            })

        } catch (error) {
            next(error)
        }
    }
    static async TutorialDeleteController(req, res, next) {
        try {
            const {
                tutorial_id
            } = req.body

            const tutorial = await req.db.tutorial.destroy({
                where: {
                    tutorial_id: tutorial_id.trim()
                }
            })

            res.redirect('/admin/tutorials')

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
                include: [{
                    model: req.db.subject
                }]
            })
            res.json({
                ok: true,
                subject
            })
        } catch (error) {
            next(error)
        }
    }



    // STATISTICS
    static async StatisticsController(req, res) {
        const Op = Sequelize.Op;
        const guests = await req.db.guests.findAll({
            raw: true
        })

        let data = []
        let labels = []
        for (let i = 6; i >= 0; i--) {
            labels.push(moment(new Date()).subtract(i, 'days').locale('uz-latn').format('MMMM Do YYYY'))
            let count = 0
            guests.forEach(guest => {
                if (moment(guest.createdAt).format('MMMM Do YYYY') === moment(new Date()).subtract(i, 'days').format('MMMM Do YYYY')) {
                    count++
                }
            });
            data.push(count)
        }

        res.status(200).json({
            data,
            labels
        })
    }
}
