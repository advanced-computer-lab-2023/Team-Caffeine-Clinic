require('dotenv').config()

var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

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
const forgotPass = require('./routes/forgotPass');
const patientRoute = require('./routes/patient')

const stripe = require('./routes/stripe')

const emplymentContract = require('./routes/emplymentContract')
const Patient = require('./models/Patient')

const healthPackageController = require('./controllers/healthPackagesController');
const Appointment = require('./routes/appointments');

const Doctor = require('./models/doctor');
const Admin = require('./models/admin');

// const./models/admin= require('cors');




var app = express();
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// app.use(bodyParser.json());



// var createError = require('http-errors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// mongoose.connect('mongodb://localhost/virtual_clinic', { useNewUrlParser: true, useUnifiedTopology: true });


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

// Configure the session
// app.use(
//   session({
//     secret: "anything for now", // A secret key for session encryption
//     resave: false, // Do not save session on every request
//     saveUninitialized: false, // Save new sessions
//     cookie: {
//       maxAge: 3600000, // Session duration in milliseconds (1 hour)
//     },
//   })
// );




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
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize())

app.use(session({  
  name: `daffyduck`,
  secret: 'some-secret-example',  
  resave: false,
  saveUninitialized: false,
  cookie: { 
    expires: new Date(253402300000000) 
  } 
}));

app.use(passport.session())



const getSession = (req, res) => {
  //console.log(req.session);
  res.send(req.session)
}

// // Passport local Strategy
// passport.use(Patient.createStrategy());
// passport.use(Doctor.createStrategy());
// passport.use(Admin.createStrategy());


// // To use with sessions
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());
// passport.serializeUser(Doctor.serializeUser());
// passport.deserializeUser(Doctor.deserializeUser());
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());




// passport.use(new LocalStrategy(
//   async (username, password, done) => {
//     try {
//       console.log('ana hena');
//       const user = await Patient.findOne({ username: username });

//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       console.log(password);
//       if (!user.validatePassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));
app.use('/api', forgotPass)
app.use('/api', stripe)

app.use('/api/patient', patientRoute)

// middleware
app.use('/api', login)
app.use('/api', signUp)
app.get('/getSession', getSession)
app.use('/api/perscription', Perscriptions)
app.use('/api/Admin',adminsRoute)
app.use('/api/emplymentContract', emplymentContract)
app.use('/api/familyMembers', familyMembersRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/doctorInfo', doctorInfoRoutes);
app.use('/api/healthpackage', healthPackageRoutes);
app.use('/api', Appointment)


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

//app.get('/api/healthPackages', healthPackageController.getHealthPackages);



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
