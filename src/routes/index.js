const userRoutes = require('./userRoutes')

function route(app) {
    app.use('/api', userRoutes);
}

module.exports = route