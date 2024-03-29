const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path')
var multer = require('multer') ;


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage })

// const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');
// const db = require('./config/database').database;
// let ejs = require('ejs');
// let session = require('express-session');
// const flash = require('connect-flash')
// let passport = require('passport');

// require('./config/passport')(passport);

// //ejs 
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

//Body parser
app.use(express.urlencoded({ extended : false}))

// // Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// //connect-flash
// app.use(flash())


// //MongoDB
// mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology : true})
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err))

// //global variable
// app.use(function(req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error')
//     next();
//   });


// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// //for routes
// app.use('/', require('./routes/index'));
// //for user routes
// app.use('/users', require('./routes/users'));

app.listen(PORT, () => {console.log(`Server is running on localhost: ${PORT}...`)})

app.post('/contact-company.html' , (req, res) => {

var { name, email, phone , message } = req.body;

var transporter = nodemailer.createTransport({
  service: '"Outlook365"',
  auth: {
    user: "info@troydreamville.com",
    pass: "Troyscott"
  }
});

var mailOptions = {
  from: 'Company Email',
  to: 'info@troydreamville.com',
  subject: 'New message from site visitor',// Subject line
  text: "We just got a new message", // plain text body
  html: `<h3> New Message from ${name}</h3> <br> <p>Email : ${email}</p> <br> <p>Phone number: ${phone}</p> <br> <p>Message : ${message}</p> <br> <h4 style='font-style:italic;font-weight:400;'>This was sent from our company's microsoft account.</h4>`, 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      res.redirect('/')
    console.log('Email sent: ' + info.response);
  }
});
})


app.post('/logistics_apply.html', upload.single('fafa') ,  function(req, res) {

  const {fname, lname, email, phone, oinfo} = req.body;

  console.log(req.body)

  console.log(req.file.path)

  var transporter = nodemailer.createTransport({
    service: '"Outlook365"',
    auth: {
      user: "info@troydreamville.com",
      pass: "Troyscott"
    }
  });
  
  var mailOptions = {
    from: '"Company Email" <info@troydreamville.com>',
    to: 'info@troydreamville.com',
    subject: 'Application for a driver position' , // Subject line
    text: "Someone just applied for a driver position", // plain text body
    html: `<h3> New Application from ${lname} ${fname}</h3> <br> <p>Email : ${email}</p> <br> <p>Phone number: ${phone}</p> <br> <p>File path: ${req.file.path}</p><br> <p>CV is located <a href='www.troydreamville.com/${req.file.path}'>here</a></p><br> <p>Message : ${oinfo}</p> <br> <h4 style='font-style:italic;font-weight:400;'>This was sent from our company's microsoft account.</h4>`, 
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {

      console.log('Email sent: ' + info.response);
      res.redirect('/')
    }
  });

})


app.post('/logistics.html',  (req, res) => {

  var { name, email, phone , message } = req.body;
  
  var transporter = nodemailer.createTransport({
    service: '"Outlook365"',
    auth: {
      user: "info@troydreamville.com",
      pass: "Troyscott"
    }
  });
  
  var mailOptions = {
    from: 'Company Email',
    to: 'info@troydreamville.com',
    subject: 'New message to fleet manager',// Subject line
    text: "We just got a new message directed to our fleet manager", // plain text body
    html: `<h3> New Message from ${name}</h3> <br> <p>Email : ${email}</p> <br> <p>Phone number: ${phone}</p> <br> <p>Message : ${message}</p> <br> <h4 style='font-style:italic;font-weight:400;'>This was sent from our company's microsoft account.</h4>`, 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        res.redirect('/')
      console.log('Email sent: ' + info.response);
    }
  });
  
  })
  

// /* ROUTES */

//static files
app.use(express.static('public'));
 