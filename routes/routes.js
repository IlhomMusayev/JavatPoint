const HomeRoute = require('./HomeRoute')
const AdminRoute = require('./AdminRoute')
const errorHandler = require("../helpers/errorHandler");

module.exports = async function (app) {
	try {
        app.use('/', HomeRoute)
        app.use('/admin', AdminRoute)
	} finally {
		app.use(errorHandler);
	}
};