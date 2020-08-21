const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/database').database;
let ejs = require('ejs');
let session = require('express-session');
const flash = require('connect-flash')
let passport = require('passport');

require('./config/passport')(passport);

//ejs 
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body parser
app.use(express.urlencoded({ extended : false}))

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//connect-flash
app.use(flash())

//MongoDB
mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology : true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

//global variable
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
    next();
  });


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//for routes
app.use('/', require('./routes/index'));

//for user routes
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {console.log(`Server is running on localhost: ${PORT}...`)})

/* ROUTES */

//static files
app.use(express.static('public'));
