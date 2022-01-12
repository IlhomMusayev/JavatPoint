const { Sequelize, DataTypes } = require('sequelize');
const init = require('../modules/init');

// create the database connection
const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/agentanet', {
    logging: false,
});    

module.exports = async function postgres() {
	try {
		await sequelize.authenticate();
		let db = {};

		// await init(db);	

		await sequelize.sync({ force: false });

		return db;
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};