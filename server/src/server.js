require('colors');

const polka = require('polka');
const mongoose = require('mongoose');
const send = require('@polka/send-type');
const { json, urlencoded } = require('body-parser');

const api = polka();
const server = polka();

// Database =====================================================
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');

mongoose
  .set('debug', function (collectionName, method, query, doc) {
    console.log(
      'Mongoose: '.cyan +
      collectionName.blue + 
      '.' + 
      method.green +
      ' (' + 
      JSON.stringify(query, null, 2) + ')'
    );
  })
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

api
  .use(json())
  .use(urlencoded({ extended: false }))
  .use('/users', users)
  .use('/messages', messages)


server
  .get('/api/test', (req, res) => send(res, 200, { msg: "API routes test"}))
  .use('/api', api);

module.exports = server;