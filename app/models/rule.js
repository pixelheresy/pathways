// Rule module
define([
	// Application.
	"app",
	"models/character",
	"models/modifier"
],

// Map dependencies from above array.
function(app, Character, Modifier) {

	var Rule = app.Models.Rule = {};

	app.Models.Rule = Backbone.Model.extend({
		defaults: {
			name: "Rule Name"
		},

		register: function(character) {
			var _t = this;
			var _c = character;
			var characterRegistry = this.collection.registry[_c.cid];
			characterRegistry.watches[_t.get("name")] = {};
			characterRegistry.watches[_t.get("name")].source = _s = _t.setWatch(_c);
			_t.check(_c, _s);
		},

		setWatch: function(character) {
			var _t = this;
			var _c = character;
			var watch = _t.get("source");
			var status = _t.get("status");
			var source;
			if (watch) {
				source = _c.targetMap(watch);
				source.on('change:value', function(){ _t.check(_c, source); });
			}
			else if (status) {
				var traits = _c.contestTraits;
				source = _c.statusEffects;
				source.on("all", function(){ _t.check(_c, source); });
				traits.on("all", function(){ _t.check(_c, source); });
			}
			if (source) {
				return source;
			}
		},

		buildModifier: function(character, source) {
			var _t = this;
			var _c = character;
			var modObj = _t.get("modifier");
			var value = 0;
			if (modObj.value && typeof modObj.value == "object") {
				if (modObj.value.calcFromTable) {
					var calcArray = modObj.value.calcFromTable;
					value = app.calcFromTable(source.get("value"), app.tables[calcArray[0]], calcArray[1]);
				}
			}
			else if (modObj.value && (modObj.value === 0 || typeof modObj.value == "number")) {
				value = modObj.value;
			}
			return new app.Models.Modifier({ name: modObj.name, value: value });
		},

		check: function(character, source) {
			var _t = this;
			var _c = character;
			var _s = source;
			var target = _c.targetMap(_t.get("target"));
			target.where({ name: _t.get("modifier").name }).forEach(function(modifier){ modifier.destroy(); });
			var conditions = this.get("conditions") || [];
			var active = false;
			var status = _t.get("status");
			if (conditions.length) {
				var matches = [];
				for (var i = 0; i < conditions.length; i++) {
					matches[i] = false;
					var type = conditions[i].type;
					if ( type == "trait" ) {
						var traits = _c.contestTraits;
						var traitWhere = traits.where( { name: conditions[i].name } );
						for (var j = 0; j < traitWhere.length; j++) {
							var traitValue = traitWhere[j].get("value");
							if		(conditions[i].operator	== "="	&& traitValue ==	conditions[i].value)	matches[i] = true;
							else if	(conditions[i].operator	== "!="	&& traitValue !=	conditions[i].value)	matches[i] = true;
							else if	(conditions[i].operator	== ">"	&& traitValue >		conditions[i].value)	matches[i] = true;
							else if	(conditions[i].operator	== "<"	&& traitValue <		conditions[i].value)	matches[i] = true;
							else if	(conditions[i].operator	== ">="	&& traitValue >=	conditions[i].value)	matches[i] = true;
							else if	(conditions[i].operator	== "<="	&& traitValue <=	conditions[i].value)	matches[i] = true;
						}
					}
					else {
						var compareValue = _s.get(type);
						if		(conditions[i].operator	== "="	&& compareValue ==	conditions[i].value)	matches[i] = true;
						else if	(conditions[i].operator	== "!="	&& compareValue !=	conditions[i].value)	matches[i] = true;
						else if	(conditions[i].operator	== ">"	&& compareValue >	conditions[i].value)	matches[i] = true;
						else if	(conditions[i].operator	== "<"	&& compareValue <	conditions[i].value)	matches[i] = true;
						else if	(conditions[i].operator	== ">="	&& compareValue >=	conditions[i].value)	matches[i] = true;
						else if	(conditions[i].operator	== "<="	&& compareValue <=	conditions[i].value)	matches[i] = true;
					}
				}
				var valid = true;
				for (var k = 0; k < matches.length; k++) {
					if (matches[k] === false) valid = false;	// one unsatisfied condition causes it to be invalidated
				}
				if (status && valid) {
					if (_c.statusEffects.where({ name: status }).length) active = true;	// if it returns a match and is valid
				}
				else if (valid) active = true;
			}
			else { // no conditions are set
				active = true;
			}
			if (active) target.add(_t.buildModifier(_c, _s));
		}
	});

	// Return the module for AMD compliance.
	return Rule;

});
