// Trait module
define([
	// Application.
	"app"
],

// Map dependencies from above array.
function(app) {

	var Trait = app.Models.Trait = {};

	app.Models.Trait = Backbone.Model.extend({
		defaults: {
			name: "Trait name",
			value: ""
		}
	});

	// Return the module for AMD compliance.
	return Trait;

});
