const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restricted = require('../auth/restricted-middleware.js');

const server = express();

const sessionConfig = {
  name: 'monster',
  secret: 'keep it secret, keep it safe',
  resave: false,
  saveUninitialized: true, // related to GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, // should be true in production
    httpOnly: true, // true means JS can't touch the cookie
  }
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); // turn on session middleware
// at this point there is a req.session object created by express-session

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
  console.log(req.session);
  res.json({ api: 'up' });
});

module.exports = server;
