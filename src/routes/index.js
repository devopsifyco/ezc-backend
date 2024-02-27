const userRoutes = require('./userRoutes')
const challengeRoutes = require('./challengeRoutes')
const sendMailRoutes = require('./sendMailRoutes')
const healthcheckRoutes = require('./healthcheckRoutes')

function route(app) {
    app.use('/health', healthcheckRoutes);
    app.use('/api', userRoutes);
    app.use('/api', challengeRoutes);
    app.use('/api', sendMailRoutes);
}

module.exports = route