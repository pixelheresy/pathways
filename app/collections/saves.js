// Saves module
define([
	"app",
	"models/savingthrow"
],

function(app, SavingThrow) {

	var Saves = app.Collections.Saves = {};
	app.Collections.Saves = Backbone.Collection.extend({
		model: app.Models.SavingThrow
	});

	return Saves;
});
