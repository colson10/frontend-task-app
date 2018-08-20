'use strict';

const cors = require('cors');
const express = require('express');
const googleRouter = require('./google-router');
require('dotenv').config();

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost'],
}));
app.use(express.static(`${__dirname}/build`));
app.use(googleRouter);

app.listen(process.env.PORT, () => {
  console.log(__dirname, 'this is the dirname');
  console.log(`SERVER UP on ${process.env.PORT}`);
});

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/build/index.html`);
});
