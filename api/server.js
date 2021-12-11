const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('colors')
const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is up'
    })
})

server.use((err, req, res, next) => {// eslint-disable-line
    res.status(err.status || 500).json({ 
        message: err.message, 
        stack: err.stack,
    })
})
module.exports = server;
