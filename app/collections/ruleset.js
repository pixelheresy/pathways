// RuleSet module
define([
	// Application.
	"app",
	"models/rule"
],

// Map dependencies from above array.
function(app, Rule) {

	var RuleSet = app.Collections.RuleSet = {};

	app.Collections.RuleSet = Backbone.Collection.extend({
		model: app.Models.Rule,
		name: "",

		initialize: function() {
			this.registry = {};
		},

		register: function(character) {
			var _c = character;
			this.registry[_c.cid] = { character : _c, watches: {} };
			_c.registered.push(this);
			this.forEach(function(rule){
				rule.register(_c);
			});
		},

		add: function(options) {
			if (this.registry && options != []) {	// if there are characters in the registry, but a new rule is added, create all rules and register them
				var ruleArray = [];
				if (options.length) {
					options.forEach(function(rule){
						if (rule instanceof app.Models.Rule) ruleArray.push(rule);
						else ruleArray.push(new app.Models.Rule(rule));
					});
				}
				else {
					if (options instanceof app.Models.Rule) ruleArray.push(options);
					else ruleArray.push(new app.Models.Rule(options));
				}
				this.constructor.__super__.add.apply(this, [ruleArray]);
				for (var i = 0; i < ruleArray.length; i++) {
					for (var propertyName in this.registry) {
						var _c = this.registry[propertyName].character;
						ruleArray[i].register(_c);
					}
				}
			}
			else this.constructor.__super__.add.apply(this, [options]);
		}
	});


	// Return the module for AMD compliance.
	return RuleSet;

});
