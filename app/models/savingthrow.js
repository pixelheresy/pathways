// SavingThrow module
define([
	"app",
	"collections/modifiercontainer"
],

function(app, ModifierContainer) {

	var SavingThrow = app.Models.SavingThrow = {};

	app.Models.SavingThrow = Backbone.Model.extend({
		defaults: {
			value: 0,
			base: 0,
			name: "Save name",
			symbol: "Symbol"
		},

		initialize: function() {
			this.on('change:base', function(){
				this.calc();
			});
			this.on('change:value', function(){
				if (this.collection && this.collection._parent) {
					this.collection._parent.set("saves", this.collection.toJSON());	// update the resolved JSON to character
				}
			});
			this.tempAdj = new app.Collections.ModifierContainer(this.get('tempAdj'));
			this.tempAdj.calcType = "sum";
			this.tempAdj.name = "Temporary Adjustments";
			this.tempAdj._parent = this;
			this.temporaryAdjustment = this.tempAdj;
			this.calc();
		},

		calc: function() {
			this.set('value', (this.get("base") + this.tempAdj.value));
		}
	});

	return SavingThrow;
});
