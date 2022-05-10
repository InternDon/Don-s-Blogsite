const express = require('express');
const req = require('express/lib/request');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { createIndexes } = require('./models/blog');
const res = require('express/lib/response');
const { render } = require('express/lib/response');
const blogRoutes = require('./routes/blogRoutes');


//Express app.
const app = express();

//Connection to mongoDB.
const dbURI = 'mongodb+srv://donadmin:1234@cluster0.zloqh.mongodb.net/nodeactivity?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

//Registered view engine (ejs).
app.set('view engine', 'ejs');
//app.set('views', 'myviews'); (another way).

//Listen for request local.
app.listen(1333);

//Middleware & Static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//Morgan MIDDLEWARE 3rd party.
app.use(morgan('dev'));

//Response to homepage.
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//MiddleWare version 2
// app.use((req, res, next) =>{
//     console.log('In the next middleware');
//     next();
// });

//Response to about page.
app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html' , {root: __dirname})
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);

//Response to 404 Page.
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname});\

    res.status(404).render('404', {title: '404'});
});