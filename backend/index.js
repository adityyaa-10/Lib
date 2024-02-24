import express from "express";
import { PORT, mongoDBURL } from './config.js'
import mongoose from "mongoose"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

// MIDDLEWARE FOR PARSING REQUEST BODY
app.use(express.json());

//Allow custom origins for CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response) => {
    // console.log(request);
    return response.status(234).send("Hello")
});


app.use('/books', booksRoute);  // Using the booksRoute for all routes starting with /books 


mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to PORT : ${PORT}`);
    });

}).catch((error) => {
    console.log(error);
})