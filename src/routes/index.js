const userRoutes = require('./userRoutes')

function route(app) {
    app.use('/api/users', userRoutes);
}

module.exports = route