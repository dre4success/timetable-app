exports.catchErrors = (fn) => {
	return function(req, res, next) {
		return fn(req, res, next).catch(next);
	}
}

exports.notFound = (req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
}

exports.flashValidationErrors = (err, req, res, next) => {
	// if no errors to show for flashes, move on
	if(!err.errors) return next(err);

	// validation errors
	const errorKeys = Object.keys(err.errors);
	errorKeys.forEach(key => req.flash('error', err.errors[key].message));
	res.redirect('back');
};