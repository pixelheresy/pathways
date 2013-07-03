// Statuses module
define([
	// Application.
	"app",
	"models/status"
],

// Map dependencies from above array.
function(app, Status) {

	var Statuses = app.Collections.Statuses = {};

	app.Collections.Statuses = Backbone.Collection.extend({
		model: app.Models.Status,

		add: function(options) {
			if (typeof options == "string") this.constructor.__super__.add.apply(this, [{ name: options }]);
			else if (typeof options[0] == "string") {
				var statusArray = [];
				for (var i = 0; i < options.length; i++) {
					statusArray.push({ name: options[i] });
				}
				this.constructor.__super__.add.apply(this, [statusArray]);
			}
			else this.constructor.__super__.add.apply(this, [options]);
		},

		remove: function(options) {
			if (typeof options == "string") {
				var models = this.where({ name: options });
				this.constructor.__super__.remove.apply(this, models);
			}
			else if (typeof options[0] == "string") {
				var modelArray = [];
				for (var i = 0; i < options.length; i++) {
					var modelsWhere = this.where({ name: options[i] });
					modelArray = modelArray.concat(modelsWhere);
				}
				this.constructor.__super__.remove.apply(this, [modelArray]);
			}
			else this.constructor.__super__.remove.apply(this, [options]);
		}
	});


	// Return the module for AMD compliance.
	return Statuses;

});
