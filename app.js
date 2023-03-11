require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// express
const express = require('express');
const app = express();

// other packages


// database
const connectDB = require('./db/connect')

// routers




// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




app.use(express.json());
app.get('/', (req, res) => {
    res.send('E COMMERCE API')
})

// notFoundError should be before errorHandler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); //should be the last

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();