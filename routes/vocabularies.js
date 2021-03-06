var express = require('express');
var router = express.Router();
var Vocabulary = require('../models/Vocabulary');

var Lesson = require('../models/Lesson');
var Vocabulary = require('../models/Vocabulary');

var setValue = function(id, value, direction, attribute, callback) {
	if (!["0", "1"].includes(value)) return false;
	if (!["foreign-native", "native-foreign"].includes(direction)) return false;
	
	id = Number(id);
	value = Number(value);
	attribute = attribute.charAt(0).toUpperCase() + attribute.slice(1); // make first letter uppercase
	
	Vocabulary.findOneById(id, function (error, vocabulary) {
		if (error || !vocabulary) return false;
		
		if (direction == "foreign-native") vocabulary["foreignNative" + attribute]  = value;
		else if (direction == "native-foreign") vocabulary["nativeForeign" + attribute] = value;

		vocabulary.save(function(success) {
			callback();
		});
	});
}

router.get('/:id/set-status/:direction/:value', function(req, res, next) {
	let params = req.params;
	setValue(params.id, params.value, params.direction, "status", function() {
		res.send(true);
	});
});

router.get('/:id/set-mark/:direction/:value', function(req, res, next) {
	let params = req.params;
	setValue(params.id, params.value, params.direction, "mark", function() {
		res.send(true);
	});
});

module.exports = router;