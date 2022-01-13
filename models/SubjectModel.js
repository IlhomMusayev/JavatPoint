module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("subject", {
		subject_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		subject_slug: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		subject_name: {
			type: Sequelize.STRING(),
			allowNull: false,
		}
	});
};