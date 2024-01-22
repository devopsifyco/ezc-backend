const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('Connect successfully');
        })
    } catch (error) {
        console.log('Connect fail'+ error);
    }
}

module.exports = connect