const express 		= require('express'),
	  path 			= require('path'),
	  bodyParser    = require('body-parser'),
	  cookieParser  = require('cookie-parser'),
	  mongoose      = require('mongoose'),
	  passport      = require('passport'),	
	  promisify     = require('es6-promisify'),
	  routes        = require('./routes/index'),
	  pug           = require('pug'),
	  app           = express();

	  // view engine setup

	  app.set('views', path.join(__dirname, 'views'));
	  app.set('view engine', 'pug');

	    // serve static files from the public folder
	    app.use(express.static(path.join(__dirname, 'public')));

	    // takes raw request and turns them into usable properties on req.body
	    app.use(bodyParser.json());
	    app.use(bodyParser.urlencoded({ extended: true}));

	    app.use('/', routes)


	 module.exports = app;

