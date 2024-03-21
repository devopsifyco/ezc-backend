const userRoutes = require('./userRoutes')
const challengeRoutes = require('./challengeRoutes')
const sendMailRoutes = require('./sendMailRoutes')
const notificationRoutes = require('./notificationRoutes')
const giftRoutes = require('./giftRoutes')
const healthcheckRoutes = require('./healthcheckRoutes')
bodyParser = require('body-parser').urlencoded({ extended: true }); 

function route(app) {
    app.use('/health', healthcheckRoutes);
    app.use('/api', bodyParser, userRoutes);
    app.use('/api', bodyParser, challengeRoutes);
    app.use('/api', bodyParser, sendMailRoutes);
    app.use('/api', bodyParser, notificationRoutes);
    app.use('/api', bodyParser, giftRoutes);
}

module.exports = route