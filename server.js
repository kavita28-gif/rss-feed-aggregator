const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const feedsRouter = require('./routes/feeds');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const db = require("./config/database");

db.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// Routes
app.use('/feeds', feedsRouter);
app.use('/users', usersRouter);


// Home route
app.get('/', (req, res) => {
  res.render('register');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
