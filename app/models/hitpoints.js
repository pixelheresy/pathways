// HitPoints module
define([
	"app"
],

function(app) {

	var HitPoints = app.Models.HitPoints = {};

	app.Models.HitPoints = Backbone.Model.extend({
		defaults: {
			max: 0,
			current: 0
		},

		initialize: function() {
			this.on('change:max', function(){
				if (this._parent) this._parent.set("hp", this.toJSON());	// update the resolved JSON to character
			});
		}

		// will have to make calc to figure current when initialized
		// also to scale current on level up
	});

	return HitPoints;
});
