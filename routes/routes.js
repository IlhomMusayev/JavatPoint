const HomeRoute = require('./HomeRoute')
const AdminRoute = require('./AdminRoute')
const TutorialRoute = require('./TutorilRoute')
const errorHandler = require("../helpers/errorHandler");

module.exports = async function (app) {
	try {
        app.use('/', HomeRoute)
        app.use('/admin', AdminRoute)
		app.use('/', TutorialRoute)

		app.use((req, res) => {
			res.render("404", {
			});
		});
	} finally {
		app.use(errorHandler);
	}
}