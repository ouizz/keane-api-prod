const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const timeout = require('connect-timeout');
const bodyParser = require('body-parser')
const passport = require("passport");
const db = require("./models/mongo");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/course');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ 
  origin: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization' , 'Origin']
}));

const corsConfig = {
  origin: [
    "*",
    //"http://localhost:3000",
    //"http://localhost:3001",
  ],
  // credentials: true,
  // preflightContinue: true,
};

db.mongoose.connect(db.url, {
  useNewUrlParser: false,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database!");
}).catch((err) => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

app.use(cors(corsConfig));
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "IMSECRETCODE",
    resave: true,
    saveUninitialized: true,
    maxAge: 3600,
  })
);

app.use(timeout('300s'))
app.use(haltOnTimedout)

app.use(cookieParser("IMSECRETCODE"));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/course' , courseRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //next(createError(404 , 'Please login to view this page.'));
  res.status(404).json({
    "meta": {
        "status": false,
        "message": "Error Not Found",
        "code": 404
    }
  });
});

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

module.exports = app;
