module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("languages", {
		language_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		language_slug: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		language_name: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
        language_status: {
            type: Sequelize.ENUM,
            values: ["active", "recording", "deleted"],
            allowNull: false,
        }
	});
};