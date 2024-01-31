const userRoutes = require('./userRoutes')
const challengeRoutes = require('./challengeRoutes')
const sendMailRoutes = require('./sendMailRoutes')

function route(app) {
    app.use('/api', userRoutes);
    app.use('/api', challengeRoutes);
    app.use('/api', sendMailRoutes);
}

module.exports = route