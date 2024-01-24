const userRouter = require('./userRoute')

function route(app) {
    app.use('/users', userRouter);
}

module.exports = route