var _test = {};

module("Character JSON",{
	setup: function() {
		_test.character = new app.Models.Character();
		_test.character.dexterity.set("base",16);
		_test.character.strength.set("base",14);
		_test.character.contestTraits.add(["Attack Type","Melee"]);
		_test.character.statusEffects.add("Prone");
		testRules.register(_test.character);
	},

	teardown: function() {
		_test.character.destroy();
		delete _test.character;
	}
});

	test("can update JSON for all ability scores when value is changed", function(){
		var json = _test.character.toJSON();
		var dex;
		for (var i = 0; i < json.abilityScores.length; i++) {
			if (json.abilityScores[i].symbol == "DEX") dex = json.abilityScores[i].value;
		}
		equal(_test.character.dexterity.get("value"), dex, "The model value and the JSON value for DEX are in sync");
		_test.character.strength.set("base", 11);
		json = _test.character.toJSON();
		var str;
		for (var j = 0; j < json.abilityScores.length; j++) {
			if (json.abilityScores[j].symbol == "STR") str = json.abilityScores[j].value;
		}
		equal(_test.character.strength.get("value"), str, "The model value and the JSON value for STR are in sync");
	});

	test("can update JSON for AC when value is changed", function() {
		var json = _test.character.toJSON();
		var ac = json.ac.value;
		equal(_test.character.ac.get("value"), ac, "The model value and the JSON value for AC are in sync");
		_test.character.dexterity.set("base", 11);
		json = _test.character.toJSON();
		ac = json.ac.value;
		equal(_test.character.ac.get("value"), ac, "The model value and the JSON value for AC are in sync");
	});

	test("can update JSON when statusEffects is changed", function() {
		var json = _test.character.toJSON();
		equal(_test.character.statusEffects.toJSON()[0].name, json.statusEffects[0].name, "The collection and JSON values for statusEffects are in sync");
		_test.character.statusEffects.add("Flat-footed");
		json = _test.character.toJSON();
		equal(_test.character.statusEffects.toJSON()[1].name, json.statusEffects[1].name, "The collection and JSON values for statusEffects are in sync");
	});

	test("can update JSON when contestTraits is changed", function() {
		var json = _test.character.toJSON();
		equal(_test.character.contestTraits.toJSON()[0].name, json.contestTraits[0].name, "The collection and JSON values for contestTraits are in sync");
		_test.character.contestTraits.add(["Spell-Effect","Invisible"]);
		json = _test.character.toJSON();
		equal(_test.character.contestTraits.toJSON()[1].name, json.contestTraits[1].name, "The collection and JSON values for contestTraits are in sync");
	});

	test("can add a Character Class level to classData which will show up in JSON", function(){
		_test.character.classData.add([{ name: "Fighter", hitDieRoll: 4, lvl: 1 }]);
		_test.character.classData.add([{ name: "Rogue", hitDieRoll: 3, lvl: 1 },{ name: "Fighter", hitDieRoll: 7, lvl: 2 }]);
		var json = _test.character.toJSON();
		equal(_test.character.classData.level, json.classData.length, "The collection and JSON values for classData are in sync");
	});
