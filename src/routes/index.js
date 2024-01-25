const userRouter = require('./userRoute')

function route(app) {
    app.use('/api/users', userRouter);
}

module.exports = route