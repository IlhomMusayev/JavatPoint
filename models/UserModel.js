module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("admin", {
		user_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		user_email: {
			type: Sequelize.STRING(32),
			allowNull: false,
			unique: true,
			lowercase: true,
		},
		user_password: {
			type: Sequelize.STRING(64),
			allowNull: false,
		},
	});
};