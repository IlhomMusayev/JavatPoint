const { Sequelize, DataTypes } = require("sequelize");

module.exports = async (db) => {
	await db.admins.hasMany(db.sessions, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.sessions.belongsTo(db.admins, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});


    await db.language.hasMany(db.subject, {
		foreignKey: {
			name: "language_id",
			allowNull: false,
		},
	});

	await db.subject.belongsTo(db.language, {
		foreignKey: {
			name: "language_id",
			allowNull: false,
		},
	});


    await db.language.hasMany(db.tutorial, {
		foreignKey: {
			name: "language_id",
			allowNull: false,
		},
	});
    

    await db.tutorial.belongsTo(db.language, {
		foreignKey: {
			name: "language_id",
			allowNull: false,
		},
	});


    await db.subject.hasMany(db.tutorial, {
		foreignKey: {
			name: "subject_id",
			allowNull: false,
		},
	});


    await db.tutorial.belongsTo(db.subject, {
		foreignKey: {
			name: "subject_id",
			allowNull: false,
		},
	});




}