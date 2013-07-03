// AbilityScores module
define([
	"app",
	"models/abilityscore"
],

function(app, AbilityScore) {

	var AbilityScores = app.Collections.AbilityScores = {};
	app.Collections.AbilityScores = Backbone.Collection.extend({
		model: app.Models.AbilityScore
	});

	return AbilityScores;
});
