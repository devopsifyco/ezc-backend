const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://thaihoang:${process.env.DB_PASS}@atlascluster.ff6acs7.mongodb.net/graduation_project`).then(() => {
            console.log('Connect successfully');
        })
    } catch (error) {
        console.log('Connect fail'+ error);
    }
}

module.exports = connect