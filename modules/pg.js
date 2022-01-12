const { Sequelize, DataTypes } = require('sequelize');
const init = require('../modules/init');
const relations = require('./relation');


const UserModel = require('../models/UserModel')
const SessionModel = require('../models/SessionModel')
const LanguageModel = require('../models/LanguageModel')
const SubjectModel = require('../models/SubjectModel')
const TutorialModel = require('../models/TutorialModel')

// create the database connection
const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/javatpoint', {
    logging: false,
});    

module.exports = async function postgres() {
	try {
		await sequelize.authenticate();
		let db = {};

		db.admins = await UserModel(sequelize, Sequelize)
		db.sessions = await SessionModel(sequelize, Sequelize);
		db.language = await LanguageModel(sequelize, Sequelize)
		db.subject = await SubjectModel(sequelize, Sequelize)
		db.tutorial = await TutorialModel(sequelize, Sequelize)

		await relations(db);
		await init(db);	

		await sequelize.sync({ force: false });

		return db;
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};