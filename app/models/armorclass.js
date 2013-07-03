// ArmorClass module
define([
	// Application.
	"app",
	"models/derived",
	"collections/modifiercontainer"
],

// Map dependencies from above array.
function(app, Derived, ModifierContainer) {

	var ArmorClass = app.Models.ArmorClass = {};

	app.Models.ArmorClass = app.Models.Derived.extend({
		defaults: {
			value: 0,
			base: 0,
			name: "Armor Class",
			symbol: "AC"
		},

		initialize: function() {
			this.on('change:value', function(){
				if (this._parent) this._parent.set("ac", this.toJSON());	// update the resolved JSON to character
			});
			this.modifiers = [
				this.abilityModifier =		new app.Collections.ModifierContainer(),
				this.armorBonus =			new app.Collections.ModifierContainer(),
				this.shieldBonus =			new app.Collections.ModifierContainer(),
				this.naturalArmor =			new app.Collections.ModifierContainer(),
				this.deflectionModifier =	new app.Collections.ModifierContainer(),
				this.dodgeBonus =			new app.Collections.ModifierContainer(),
				this.otherDefense =			new app.Collections.ModifierContainer()
			];
			this.abilityModifier.name =		"Ability Modifier (AC)";
			this.armorBonus.name =			"Armor Bonus";
			this.shieldBonus.name =			"Shield Bonus";
			this.naturalArmor.name =		"Natural Armor Bonus";
			this.deflectionModifier.name =	"Deflection Modifier";
			this.dodgeBonus.name =			"Dodge Bonus";
			this.otherDefense.name =		"Other Defense Modifiers";
			this.abilityModifier.calcType = this.dodgeBonus.calcType = this.otherDefense.calcType = "sum";
			for (var i = 0; i < this.modifiers.length; i++) {
				this.modifiers[i]._parent = this;
			}
			this.calc();
		},

		calc: function() {
			var acValue = this.get('base');
			for (var i = 0; i < this.modifiers.length; i++) {
				acValue += this.modifiers[i].value;
			}
			this.set('value', acValue);
		}
	});

	// Return the module for AMD compliance.
	return ArmorClass;

});
