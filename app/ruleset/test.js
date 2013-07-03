// TestRules module
define([
	// Application.
	"app",
	"collections/ruleset"
],

// Map dependencies from above array.
function(app) {

	var testRules = new app.Collections.RuleSet();
	testRules.add([
		{
			name: "Dexterity applies an ability score modifier to AC",
			source: "dexterity",
			target: "ac.abilityModifier",
			modifier: { name: "Dexterity Modifier (AC)", value: { calcFromTable: [ "abilityModTable", "Modifier"] } }
		},
		{
			name: "Strength applies an ability score modifier to Attack Bonus",
			source: "strength",
			target: "ab.abilityModifier",
			modifier: { name: "Strength Modifier (Attack Bonus)", value: { calcFromTable: [ "abilityModTable", "Modifier"] } }
		},
		{
			name: "Prone character suffer a -4 penalty vs. melee",
			status: "Prone",
			target: "ac.otherDefense",
			conditions: [{ name: "Attack Type", value: "Melee", operator: "=", type: "trait"}],
			modifier: { name: "Prone (vs. Melee)", value: -4}
		},
		{
			name: "Prone character gain a +4 bonus vs. ranged",
			status: "Prone",
			target: "ac.otherDefense",
			conditions: [{ name: "Attack Type", value: "Ranged", operator: "=", type: "trait"}],
			modifier: { name: "Prone (vs. Ranged)", value: 4}
		}
	]);


	// Return the module for AMD compliance.
	return testRules;

});
