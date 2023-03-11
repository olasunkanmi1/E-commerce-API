require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// express
const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// database
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes');



// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req, res) => {
    res.send('E COMMERCE API')
})

app.use('/api/v1/auth', authRouter);

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