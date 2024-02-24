import express from "express";
import { PORT, mongoDBURL } from './config.js'
import mongoose from "mongoose"
import { Book } from './models/bookModel.js'

const app = express();

// MIDDLEWARE FOR PARSING REQUEST BODY
app.use(express.json());

app.get('/', (request, response) => {
    // console.log(request);
    return response.status(234).send("Hello")
});

// Route to save a new book
app.post('/books', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields"
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to get all Books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({}); // Passing an empty object as argument to retrieve all the books
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
})


// Route to get a single book by ID
app.get('/books/:id', async (request, response) => {
    try {
        const book = await Book.findById(request.params.id);
        if (!book) {
            return response.status(404).send({ message: "Book not found" });
        }
        return response.status(200).send(book);
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
}
);

// Route to update a book by ID
app.put('/books/:id', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear) {
            return response.status(400).send({ message: "Send all required fields" });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({ message: "Book not found" });
        }

        return response.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
});

// Route to delete a book by ID
app.delete('/books/:id', async (request, response) => {
    try {
        const result = await Book.findByIdAndDelete(request.params.id);
        if (!result) {
            return response.status(404).send({ message: "Book not found" });
        }
        return response.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
});


mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to PORT : ${PORT}`);
    });

}).catch((error) => {
    console.log(error);
})