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
const cors = require('cors');
const fileUpload = require('express-fileupload');


// database
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

// testing -- to get cookies
// app.get('/api/v1', (req, res) => {
//     console.log(req.signedCookies)
//     res.send('E COMMERCE API')
// })


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

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