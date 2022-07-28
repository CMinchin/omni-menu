const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const db = require('./config/connection');
const {withAuth} = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(withAuth);

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for omni-menu running on port ${PORT}!`);
  });
});