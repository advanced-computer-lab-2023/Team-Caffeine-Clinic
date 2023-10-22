require('dotenv').config()

var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//Import Routes

const signUp = require('./routes/signup');
const Perscriptions = require('./routes/Perscriptions');

const familyMembersRoute = require('./routes/familyMembers');
const doctorsRoute = require('./routes/doctors');
const adminsRoute = require('./routes/Admin');
const doctorInfoRoutes = require('./routes/doctorInfo');
const login  = require('./routes/login');
const healthPackageRoutes = require('./routes/healthPackages');

const Patient = require('./models/Patient')

const healthPackageController = require('./controllers/healthPackagesController');
const Appointment = require('./routes/appointments');
// const cors = require('cors');



var app = express();

app.use(bodyParser.urlencoded({ extended: false }));


// app.use(bodyParser.json());
// app.use(cors());


// var createError = require('http-errors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// mongoose.connect('mongodb://localhost/virtual_clinic', { useNewUrlParser: true, useUnifiedTopology: true });



// Configure the session
app.use(
  session({
    secret: "anything for now", // A secret key for session encryption
    resave: false, // Do not save session on every request
    saveUninitialized: true, // Save new sessions
    cookie: { maxAge: 3600000 }, // Session duration in milliseconds (1 hour)
  })
);



// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));

// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(
  (username, password, done) => {
    // In this function, you should validate the provided username and password.
    // You can query your database to find the user and check if the password matches.
    // If the username and password are valid, call `done(null, user)`; if not, call `done(null, false)`.

    // Example:
    console.log(username);
    console.log(password);

    Patient.findOne({ username: username }, function(err, user) {
        console.log('a7a');
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
      if (!user.validPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
      console.log(user);
      return done(null, user);
    });
  }
));

// middleware
app.use(express.json());
app.use('/api', login)
app.use('/api', signUp)
app.use('/api/perscription', Perscriptions)
app.use('/api/Admin',adminsRoute)
app.use('/api/familyMembers', familyMembersRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/doctorInfo', doctorInfoRoutes);
app.use('/api/healthpackage', healthPackageRoutes);
app.use('/api', Appointment)


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

// // // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// routes
app.get('/', (req, res) => {
  res.send('Welcome back, user') 
})

app.get('/api/healthPackages', healthPackageController.getHealthPackages);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connencted to DB & Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


// const PORT = 3000;     
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app;
