// Character module
define([
	// Application.
	"app",
	"collections/abilityscores",
	"collections/statuses",
	"collections/traits",
	"collections/classcontainer",
	"collections/saves",
	"models/armorclass",
	"models/attackbonus",
	"models/hitpoints",
	"models/savingthrow"
],

// Map dependencies from above array.
function(app, Statuses, Traits, AbilityScores, ClassContainer, Saves, ArmorClass, AttackBonus, HitPoints, SavingThrow) {


	var Character = app.Models.Character = {};

	app.Models.Character = Backbone.Model.extend({
		defaults: {
			name: 'Character Name',
			abilityScores: [
				{ symbol: "STR", name: "Strength", base: 11},
				{ symbol: "DEX", name: "Dexterity", base: 11},
				{ symbol: "CON", name: "Constitution", base: 11},
				{ symbol: "INT", name: "Intelligence", base: 11},
				{ symbol: "WIS", name: "Wisdom", base: 11},
				{ symbol: "CHA", name: "Charisma", base: 11}
			],
			saves: [
				{ symbol: "FOR", name: "Fortitude", base: 0 },
				{ symbol: "REF", name: "Reflexes", base: 0 },
				{ symbol: "WIL", name: "Willpower", base: 0 }
			],
			ac: { symbol: "AC", name: "Armor Class", base: 10 },
			ab: { symbol: "AB", name: "Attack Bonus", base: 0 },
			classData: [],
			contestTraits: [],
			statusEffects: [],
			hp: { max: 0, current: 0 }
		},

		initialize: function() {
			var _t = this;
			_t.abilityScores =	new app.Collections.AbilityScores(_t.get('abilityScores'));

			_t.strength =		_t.abilityScores.where({ symbol: "STR" })[0];
			_t.dexterity =		_t.abilityScores.where({ symbol: "DEX" })[0];
			_t.constitution =	_t.abilityScores.where({ symbol: "CON" })[0];
			_t.intelligence =	_t.abilityScores.where({ symbol: "INT" })[0];
			_t.wisdom =			_t.abilityScores.where({ symbol: "WIS" })[0];
			_t.charisma =		_t.abilityScores.where({ symbol: "CHA" })[0];

			_t.saves =			new app.Collections.Saves(_t.get('saves'));

			_t.fortitude =		_t.saves.where({ symbol: "FOR" })[0];
			_t.reflexes =		_t.saves.where({ symbol: "REF" })[0];
			_t.willpower =		_t.saves.where({ symbol: "WIL" })[0];

			_t.ac =				new app.Models.ArmorClass(_t.get('ac'));
			_t.ab =				new app.Models.AttackBonus(_t.get('ab'));
			_t.armorClass =		_t.ac;
			_t.attackBonus =	_t.ab;

			_t.classData =		new app.Collections.ClassContainer(_t.get('classData'));

			_t.contestTraits =	new app.Collections.Traits(_t.get('contestTraits'));
			_t.statusEffects =	new app.Collections.Statuses(_t.get('statusEffects'));

			_t.hp =				new app.Models.HitPoints(_t.get('hp'));

			_t.registered =		[];

			// update character's .toJSON() attributes on value/member changes
			_t.abilityScores._parent = _t.saves._parent = _t.ac._parent = _t.ab._parent = _t;	// these are internal to models
			_t.classData._parent = _t.hp._parent = _t;
			_t.classData.on("all", function() { _t.set("classData", this.toJSON()); });			// these are external to collections
			_t.constitution.on("change:value", function() { _t.classData.calc(); });
			_t.contestTraits.on("all", function() { _t.set("contestTraits", this.toJSON()); });
			_t.statusEffects.on("all", function() { _t.set("statusEffects", this.toJSON()); });
		},

		targetMap: function(string) {
			var target;
			switch (string) {
				case "strength" :				target = this.strength; break;
				case "dexterity" :				target = this.dexterity; break;
				case "constitution" :			target = this.constitution; break;
				case "intelligence" :			target = this.intelligence; break;
				case "wisdom" :					target = this.wisdom; break;
				case "charisma" :				target = this.charisma; break;

				case "ab":						target = this.ab; break;
				case "ab.abilityModifier":		target = this.ab.abilityModifier; break;
				case "ab.weaponBonus":			target = this.ab.weaponBonus; break;
				case "ab.sizeModifier":			target = this.ab.sizeModifier; break;
				case "ab.otherAttack":			target = this.ab.otherAttack; break;

				case "ac":						target = this.ac; break;
				case "ac.abilityModifier":		target = this.ac.abilityModifier; break;
				case "ac.armorBonus":			target = this.ac.armorBonus; break;
				case "ac.shieldBonus":			target = this.ac.shieldBonus; break;
				case "ac.naturalArmor":			target = this.ac.naturalArmor; break;
				case "ac.deflectionModifier":	target = this.ac.deflectionModifier; break;
				case "ac.dodgeBonus":			target = this.ac.dodgeBonus; break;
				case "ac.otherDefense":			target = this.ac.otherDefense; break;

				case "classData":				target = this.classData; break;

				case "contestTraits":			target = this.contestTraits; break;
				case "statusEffects":			target = this.statusEffects; break;
				// ...
			}
			return target;
		},

		destroy: function(options) {
			while (this.registered.length > 0) {
				delete this.registered[0].registry[this.cid];
				this.registered.shift();
				this.constructor.__super__.destroy.apply(this, [options]);
			}
		}
	});

	// Return the module for AMD compliance.
	return Character;

});
