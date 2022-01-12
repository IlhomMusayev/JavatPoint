const HomeRoute = require('./HomeRoute')
module.exports = function routes(app) {
    app.use('/', HomeRoute)
}
