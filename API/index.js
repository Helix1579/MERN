import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './Routes/UserRoute.js';
import authRoute from './Routes/AuthRoute.js';
import listingRoute from './Routes/ListingRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error : ', err);
    });

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Replace this with the actual origin of your client application
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials

    // Respond to preflight requests
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        );
        res.sendStatus(200);
    } else {
        next();
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000 :)');
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Hello World !',
    });
});

app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listing', listingRoute);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
