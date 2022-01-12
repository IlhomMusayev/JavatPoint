const HomeRoute = require('./HomeRoute')
const AdminRoute = require('./AdminRoute')
module.exports = function routes(app) {
    app.use('/', HomeRoute)
    app.use('/admin', AdminRoute)
}
