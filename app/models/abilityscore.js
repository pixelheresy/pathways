// AbilityScore module
define([
	"app",
	"collections/modifiercontainer"
],

function(app, ModifierContainer) {

	var AbilityScore = app.Models.AbilityScore = {};

	app.Models.AbilityScore = Backbone.Model.extend({
		defaults: {
			value: 0,
			base: 0,
			name: "Ability name",
			symbol: "Symbol"
		},

		initialize: function() {
			this.on('change:base', function(){
				this.calc();
			});
			this.on('change:value', function(){
				if (this.collection && this.collection._parent) {
					this.collection._parent.set("abilityScores", this.collection.toJSON());	// update the resolved JSON to character
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

	return AbilityScore;
});
