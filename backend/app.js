require('dotenv').config()

var express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
// const http = require('http');
// const socketIO = require('socket.io');

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

const MedicineRoute = require('./routes/Medicine')
const pharmacistRoute = require('./routes/pharmacist')

// const./models/admin= require('cors');




var app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// io.on('connection', (socket) => {
//   console.log('User connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   // Handle WebRTC signaling events
//   socket.on('offer', (data) => {
//     socket.to(data.to).emit('offer', data);
//   });

//   socket.on('answer', (data) => {
//     socket.to(data.to).emit('answer', data);
//   });

//   socket.on('ice-candidate', (data) => {
//     socket.to(data.to).emit('ice-candidate', data.candidate);
//   });
// });

// server.listen(3001, () => {
//   console.log('Server running on port 3001');
// });



app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});


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

//////////Warning : Do not Delete OR Change >:(
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use('/api', forgotPass)
app.use('/api', stripe)

app.use('/api/patient', patientRoute)

// middleware
app.use('/api', login)
app.use('/api', signUp)
app.get('/getSession', getSession)
app.use('/api/medicine', MedicineRoute)
app.use('/api/pharmacists', pharmacistRoute);
app.use('/api/perscription', Perscriptions)
app.use('/api/Admin',adminsRoute)
app.use('/api/emplymentContract', emplymentContract)
app.use('/api/familyMembers', familyMembersRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/doctorInfo', doctorInfoRoutes);
app.use('/api/healthpackage', healthPackageRoutes);
app.use('/api', Appointment)



// routes
app.get('/', (req, res) => {
  res.send('Welcome back, user') 
})

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

module.exports = app;
