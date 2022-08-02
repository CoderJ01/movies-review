// middleware
import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv'; // access environment variables
import mongodb from 'mongodb'; // access database
import MoviesRoute from './api/MoviesRoute.js'; // file to be created later

import MoviesDAO from './dao/MoviesDAO.js';
import ReviewsDAO from './dao/ReviewsDAO.js';

class Index {

    static app = express(); // create server
    static router = express.Router(); // provide access to export router

    // define application flow of execution
    static main() {
        dotenv.config(); // load environment variables
        Index.setUpServer();
        Index.setUpDatabase();
    }

    // configure server execution
    // attach cors and express.json middleware
    static setUpServer() {
        Index.app.use(cors());
        Index.app.use(express.json()); // enable server to read and accept JSON in request's body
        
        // specify initial routes 
        Index.app.use('/api/v1/movies',
            MoviesRoute.configRoutes(Index.router));
        Index.app.use('*', (req, res) => {
            res.status(404).json({error: 'not found'});
        });
    }

    static async setUpDatabase() {
        const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI); // create MongoClient instance and pass
                                                                                 // it in the database URI
        const port = process.env.PORT || 8000;
        try {
            // Connect to MongoDB cluster
            await client.connect();

            // get refernce to the MoviesDAO file
            await MoviesDAO.injectDB(client);

            await ReviewsDAO.injectDB(client);

            // start web server
            Index.app.listen(port, () => {
                console.log(`server is running on port:${port}`);
            });
        } catch (e) {
            console.log(e);
            process.exit(1);
        }
    }
}

// initialize application execution
Index.main();