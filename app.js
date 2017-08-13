const express 			= require('express'),
	  session           = require('express-session'),
	  path 				= require('path'),
	  bodyParser    	= require('body-parser'),
	  cookieParser  	= require('cookie-parser'),
	  mongoose      	= require('mongoose'),
	  MongoStore        = require('connect-mongo')(session),
	  passport      	= require('passport'),	
	  promisify     	= require('es6-promisify'),
	  flash             = require('connect-flash'),
	  expressValidator	= require('express-validator'),
	  pug           	= require('pug'),
	  errorHandlers 	= require('./handlers/errorHandlers'),
	  help              = require('./help'),
	  routes        	= require('./routes/index'),
	    app           	= express(),
	  http              = require('http').Server(app),
	  io                = require('socket.io')(http);

	  // require('./controllers/courseController')(io);
	  require('./handlers/passport');

	  // view engine setup

	  app.set('views', path.join(__dirname, 'views'));
	  app.set('view engine', 'pug');

	    // serve static files from the public folder
	    app.use(express.static(path.join(__dirname, 'public')));

	    // takes raw request and turns them into usable properties on req.body
	    app.use(bodyParser.json());
	    app.use(bodyParser.urlencoded({ extended: true}));

	    // Exposes methods for validating data
	    app.use(expressValidator());

	   // populates req.cookies with any cookies that came along
	   app.use(cookieParser());

	   // Sessions allow us to store data on visitors from request to request
	   // it keeps users logged in and allows us to send flash message
	   app.use(session({
	   	secret: process.env.SECRET,
	   	key: process.env.KEY,
	   	resave: false,
	   	saveUninitialized: false,
	   	store: new MongoStore({ mongooseConnection: mongoose.connection })

	   }));

	   // Passport Js is used to handle login
	   app.use(passport.initialize());
	   app.use(passport.session());

	   // flash middleware let's us req.flash to display message from one place to another
	   app.use(flash());

	   // pass variables to template and all requests
	   app.use((req, res, next) => {
	   	res.locals.h = help;
	   	res.locals.flashes = req.flash();
	   	res.locals.user = req.user || null;
	   	next();
	   });

	    app.use('/', routes);

	    // if the above routes didn't work, we 404 them and forward to error handler
	    app.use(errorHandlers.notFound);

	    // will see if the errors are just validation errors
	    app.use(errorHandlers.flashValidationErrors);


	 // module.exports = app;
	 module.exports = http;

