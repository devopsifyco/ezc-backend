const userRoutes = require('./userRoutes')
const challengeRoutes = require('./challengeRoutes')

function route(app) {
    app.use('/api', userRoutes);
    app.use('/api', challengeRoutes);
}

module.exports = route