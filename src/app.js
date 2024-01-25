const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./config/db/db')
const app = express();
dotenv.configDotenv();
const route = require('./routes/index')
connect();


// allow cors requests from any origin and with credentials
// app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
}));


app.use(express.json());
route(app);


// app.listen(process.env.PORT, () => {
//     console.log(`Listening at ${process.env.PORT}`);
// })

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 4000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
