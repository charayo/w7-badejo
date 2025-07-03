const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set up Handlebars with custom helpers
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    calculation: function (num) {
      return num + 10;
    },
    strong: function (options) {
      return '<strong>' + options.fn(this) + '</strong>';
    },
    isEven: function (value, options) {
      return value % 2 === 0 ? options.fn(this) : options.inverse(this);
    }
  }
});

// Register Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Set the views directory explicitly
app.set('views', path.join(__dirname, 'views'));

// Sample data
const people = ["Yehuda Katz", "Alan Johnson", "Charles Jolley"];
const license = null;

// Home route
app.get('/', (req, res) => {
  res.render('home', {
    author: true,
    firstName: "Yehuda",
    lastName: "Katz",
    license
  });
});

// List route
app.get('/list', (req, res) => {
  res.render('list', {
    people
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
