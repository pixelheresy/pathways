// CharacterClass module
define([
	"app"
],

function(app) {

	var CharacterClass = app.Models.CharacterClass = {};

	app.Models.CharacterClass = Backbone.Model.extend({
		defaults: {
			name: "Class name",
			hitDieRoll: ""
		}
	});

	return CharacterClass;
});
