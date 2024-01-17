const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./config/db/db')
const app = express();
dotenv.configDotenv();
connect();

app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
}));

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`);
})