const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config({ path: 'variables.env'});

// connect to database
mongoose.connect(process.env.DATABASE, {
	useMongoClient: true
})

// tell mongoose to use es6 promise since it's own is deprecated
mongoose.Promise = global.Promise;

// handle bad connections
mongoose.connection.on('error', (err) => {
	console.log(`${err.message}`);
})

// import all models
require('./models/Course');
require('./models/User');

const app = require('./app');

app.listen(8080, () => {
	console.log("Server Started...")
})