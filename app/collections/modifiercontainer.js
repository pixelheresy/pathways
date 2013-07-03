// ModifierContainer module
define([
	// Application.
	"app",
	"models/modifier"
],

// Map dependencies from above array.
function(app, Modifier) {

	var ModifierContainer = app.Collections.ModifierContainer = {};

	app.Collections.ModifierContainer = Backbone.Collection.extend({
		model: app.Models.Modifier,
		value: 0,
		calcType: "highest", // ["sum"/"highest"/"lowest"/"only"]

		add: function(options) {
			if (this.calcType == "only") this.reset();
			this.constructor.__super__.add.apply(this, [options]);
			this.calc();
		},

		remove: function(options) {
			Backbone.Collection.prototype.remove.apply(this, [options]); // === this.constructor.__super__.remove.apply(this, [options]), but inheritance issue in destroy();
			this.calc();
		},

		calc: function() {
			var value = 0;
			var calcType = this.calcType;
			this.forEach(function(modifier){
				var modVal = modifier.get("value");
				switch(calcType) {
					case "sum": value += modVal; break;							// adds modifier (or subtracts negative)
					case "highest": if (modVal > value) value = modVal; break;	// highest replaces value if new is higher
					case "lowest": if (modVal < value) value = modVal; break;	// lowest replaces value if new is lower
					case "only": value = modVal; break;
				}
			});
			this.value = value;
			if (this._parent) { this._parent.calc(); }
		}
	});

	// Return the module for AMD compliance.
	return ModifierContainer;

});
