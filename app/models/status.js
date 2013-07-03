// Status module
define([
	// Application.
	"app"
],

// Map dependencies from above array.
function(app) {

	var Status = app.Models.Status = {};

	app.Models.Status = Backbone.Model.extend({
		defaults: {
			name: "Status name"
		}
	});

	// Return the module for AMD compliance.
	return Status;

});
