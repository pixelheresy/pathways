// Traits module
define([
	// Application.
	"app",
	"models/trait"
],

// Map dependencies from above array.
function(app, Trait) {

	var Traits = app.Collections.Traits = {};

	app.Collections.Traits = Backbone.Collection.extend({
		model: app.Models.Trait,

		initialize: function() {
			this.on('change:all', function(){
				if (this._parent) this._parent.set(this._alias, this.toJSON());	// update the resolved JSON to character
			});
		},

		add: function(options) {
			if (typeof options[0] == "string" && options.length == 2) this.constructor.__super__.add.apply(this, [{ name: options[0], value: options[1] }]);
			else if (options[0] && typeof options[0][0] == "string" && options[0].length == 2) {
				var traitsArray = [];
				for (var i = 0; i < options.length; i++) {
					traitsArray.push({ name: options[i][0], value: options[i][1] });
				}
				this.constructor.__super__.add.apply(this, [traitsArray]);
			}
			else this.constructor.__super__.add.apply(this, [options]);
		},
		remove: function(options) {
			if (typeof options[0] == "string" && options.length == 2) {
				var models = this.where({ name: options[0], value: options[1] });
				this.constructor.__super__.remove.apply(this, models);
			}
			else if (options[0] && typeof options[0][0] == "string" && options[0].length ==2) {
				var modelArray = [];
				for (var i = 0; i < options.length; i++) {
					var modelsWhere = this.where({ name: options[i][0], value: options[i][1] });
					modelArray = modelArray.concat(modelsWhere);
				}
				this.constructor.__super__.remove.apply(this, [modelArray]);
			}
			else this.constructor.__super__.remove.apply(this, [options]);
		}
	});
	// Return the module for AMD compliance.
	return Traits;

});
