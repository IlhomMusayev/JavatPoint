module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("guests", {
		guest_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		guest_ip: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		guest_agent: {
			type: Sequelize.STRING(),
			allowNull: false,
		}
	});
};