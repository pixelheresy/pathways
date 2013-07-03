var _test = {};

module("Rules",{
	setup: function() {
		_test.character = new app.Models.Character();
		testRules.register(_test.character);
	},

	teardown: function() {
		_test.character.destroy();
		delete _test.character;
	}
});

	test("can register character to ruleSet", function(){
		ok(testRules.registry[_test.character.cid], "Character is registered in testRules");
	});

	test("can watch an arbitrary value and apply a modifier", function(){
		_test.character.dexterity.set("base", 4);
		_test.character.dexterity.set("base", 16);
		equal(_test.character.ac.get("value"), 13, "Setting DEX to 16, yields a +3 bonus to AC");
	});

	test("can look for a status affect and apply a modifier", function(){
		_test.character.contestTraits.add(["Attack Type","Melee"]);
		equal(_test.character.ac.get("value"), 10, "Not Prove vs. Melee: AC 10");
		_test.character.statusEffects.add("Prone");
		equal(_test.character.ac.get("value"), 6, "Prone vs. Melee, yields a -4 penalty to AC");
	});

	test("can register a new rule to each registered charcter of a RuleSet Collection", function(){
		var fakeRule = new app.Models.Rule({
			name: "Add a +1 to naturalArmor AC, just because [fake rule]",
			target: "ac.naturalArmor",
			modifier: { name: "Tough Skin [fake]", value: 1}
		});
		testRules.add(fakeRule);
		equal(_test.character.ac.get("value"), 11, "Fake rule brings current character's AC to 11");
		fakeRule.destroy();
	});

	test("can look at an arbitrary value, by a condition and apply a modifier", function() {
		var fakeRule = new app.Models.Rule({
			name: "Charisma over 18, yields a +2 otherDefense modifier to AC [fake rule]",
			source: "charisma",
			target: "ac.otherDefense",
			conditions: [{ name: "Charisma", value: 18, operator: ">", type: "value"}],
			modifier: { name: "Super Pretty Defense [fake]", value: 2 }
		});
		testRules.add(fakeRule);
		_test.character.charisma.set("base", 19);
		equal(_test.character.ac.get("value"), 12, "Fake rule brings current character's AC to 12");
		fakeRule.destroy();
	});
