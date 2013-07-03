// AttackBonus module
define([
	// Application.
	"app",
	"models/derived",
	"collections/modifiercontainer"
],

// Map dependencies from above array.
function(app, Derived, ModifierContainer) {

	var AttackBonus = app.Models.AttackBonus = {};

	app.Models.AttackBonus = app.Models.Derived.extend({
		defaults: {
			value: 0,
			base: 0,
			name: "Attack Bonus",
			symbol: "AB"
		},

		initialize: function() {
			this.on('change:value', function(){
				if (this._parent) this._parent.set("ac", this.toJSON());	// update the resolved JSON to character
			});
			this.modifiers = [
				this.abilityModifier =		new app.Collections.ModifierContainer(),
				this.weaponBonus =			new app.Collections.ModifierContainer(),
				this.sizeModifier =			new app.Collections.ModifierContainer(),
				this.otherAttack =			new app.Collections.ModifierContainer()
			];
			this.abilityModifier.name =		"Ability Modifier (Attack Bonus)";
			this.weaponBonus.name =			"Weapon Enhancement Bonus";
			this.sizeModifier.name =		"Size Modifier (Attack Bonus)";
			this.otherAttack.name =			"Other Attack Modifiers";
			this.abilityModifier.calcType = this.otherAttack.calcType = "sum";
			this.sizeModifier.calcType = "only";
			for (var i = 0; i < this.modifiers.length; i++) {
				this.modifiers[i]._parent = this;
			}
			this.calc();
		},

		calc: function() {
			var abValue = this.get('base');
			for (var i = 0; i < this.modifiers.length; i++) {
				abValue += this.modifiers[i].value;
			}
			this.set('value', abValue);
		}
	});

	// Return the module for AMD compliance.
	return AttackBonus;

});
