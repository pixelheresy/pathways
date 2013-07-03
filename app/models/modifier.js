// Modifier module
define([
	// Application.
	"app"
],

// Map dependencies from above array.
function(app) {

	var Modifier = app.Models.Modifier = {};

	app.Models.Modifier = Backbone.Model.extend({
		defaults: {
			value: 0,
			name: "Modifier name",
			base: 0
		}
	});

	// Return the module for AMD compliance.
	return Modifier;

});
