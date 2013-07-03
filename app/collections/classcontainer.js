// ClassContainer module
define([
	"app",
	"models/class"
],

function(app, CharacterClass) {

	var ClassContainer = app.Collections.ClassContainer = {};
	app.Collections.ClassContainer = Backbone.Collection.extend({
		model: app.Models.CharacterClass,

		initialize: function() {
			var _t = this;
			_t.level = 0;
			_t.calc();
		},

		add: function(options){
			this.constructor.__super__.add.apply(this, [options]);
			this.calc();
		},

		remove: function(options){
			this.constructor.__super__.remove.apply(this, [options]);
			this.calc();
		},

		calc: function() {
			if (this._parent) {
				var maxHitpoints = 0;
				var bab = 0;
				var fortitude = 0;
				var reflexes = 0;
				var willpower = 0;
				var _c = this._parent;
				var con = _c.constitution.get("value");
				var classObj = {};
				for (var i = 0; i < this.length; i++) {
					maxHitpoints += this.models[i].get("hitDieRoll") + app.calcFromTable(con, app.tables.abilityModTable, "Modifier");
					if (!classObj[this.models[i].get("name")]) classObj[this.models[i].get("name")] = 0;
					classObj[this.models[i].get("name")]++;
				}
				for (var propertyName in classObj) {
					var classTable = app.tables.characterClass[propertyName];
					var classLevel = classObj[propertyName];
					bab += app.calcFromTable(classLevel, classTable, "Base Attack Bonus")[0];
					fortitude += app.calcFromTable(classLevel, classTable, "Fortitude");
					reflexes += app.calcFromTable(classLevel, classTable, "Reflexes");
					willpower += app.calcFromTable(classLevel, classTable, "Willpower");
				}
				
				this.classObj = classObj;
				this.level = this.length;
				_c.hp.set("max", maxHitpoints);
				_c.ab.set("base", bab);
				_c.fortitude.set("base", fortitude);
				_c.reflexes.set("base", reflexes);
				_c.willpower.set("base", willpower);
			}
		}
	});

	return ClassContainer;
});
