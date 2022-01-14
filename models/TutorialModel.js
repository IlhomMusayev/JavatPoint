module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("tutorial", {
		tutorial_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},	
		tutorial_slug: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		tutorial_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
        tutorial_content: {
			type: Sequelize.TEXT,
			allowNull: false,
		}
	});
};