const express = require('express');
const exphbs = require('express-handlebars');
 
const app = express();
 
// Custom helpers
const hbs = exphbs.create({
    extname: '.hbs',
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
 
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
 
// Sample data
const people = ["Yehuda Katz", "Alan Johnson", "Charles Jolley"];
const license = null;
 
app.get('/', (req, res) => {
    res.render('home', {
        author: true,
        firstName: "Yehuda",
        lastName: "Katz",
        license,
        layout: 'main'
    });
});
 
app.get('/list', (req, res) => {
    res.render('list', {
        people,
        layout: 'main'
    });
});
 
app.listen(3000, () => console.log('Server started on http://localhost:3000'));