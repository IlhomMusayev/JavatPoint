const { generateHash } = require('../modules/bcript')

module.exports = async function init(db) {
	const count = await db.admins.count();

	if (count === 0) {
		const admin = await db.admins.create({
			user_email: "admin@admin.uz",
			user_password: generateHash("admin"),
		});
	}
}