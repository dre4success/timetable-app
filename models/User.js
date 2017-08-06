const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHanlder = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid Email Address'],
		required: 'Please enter your email address'

	},
	name: {
		type: String,
		required: 'Please enter your name',
		trim: true
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
userSchema.plugin(mongodbErrorHanlder);

module.exports = mongoose.model('User', userSchema);
