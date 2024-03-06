const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./config/db/db')
const app = express();
dotenv.configDotenv();
var bodyParser = require('body-parser');
const route = require('./routes/index')
connect();


app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


app.use(express.json({ limit: '10mb' }));
route(app);

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
 }));
 
 app.use(bodyParser.json({ limit: '10mb' }));


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
