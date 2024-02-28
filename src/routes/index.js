const userRoutes = require('./userRoutes')
const challengeRoutes = require('./challengeRoutes')
const sendMailRoutes = require('./sendMailRoutes')
const healthcheckRoutes = require('./healthcheckRoutes')
bodyParser = require('body-parser').urlencoded({ extended: true }); 

function route(app) {
    app.use('/health', healthcheckRoutes);
    app.use('/api', bodyParser, userRoutes);
    app.use('/api', bodyParser, challengeRoutes);
    app.use('/api', bodyParser, sendMailRoutes);
}

module.exports = route