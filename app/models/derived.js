// Derived module
define([
	// Application.
	"app"
],

// Map dependencies from above array.
function(app) {

	var Derived = app.Models.Derived = {};

	app.Models.Derived = Backbone.Model.extend({
	});

	// Return the module for AMD compliance.
	return Derived;

});
