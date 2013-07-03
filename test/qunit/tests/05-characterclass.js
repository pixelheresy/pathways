var _test = {};

module("Character Classes",{
	setup: function() {
		_test.character = new app.Models.Character();
		testRules.register(_test.character);
	},

	teardown: function() {
		_test.character.destroy();
		delete _test.character;
	}
});

	test("can add a Character Class level to classData", function(){
		_test.character.classData.add([{ name: "Fighter", hitDieRoll: 4, lvl: 1 }]);
		equal(_test.character.classData.length, 1, "Something was added to test data");
		_test.character.classData.add([{ name: "Rogue", hitDieRoll: 3, lvl: 1 },{ name: "Fighter", hitDieRoll: 7, lvl: 2 }]);
		equal(_test.character.classData.length, 3, "Two more levels were added for a total of 3");
	});

	test("can add a Character Class level and base attack bonus is increased accordingly [Fighter]", function(){
		_test.character.classData.add([{ name: "Fighter", hitDieRoll: 4, lvl: 1 }]);
		equal(_test.character.ab.get("base"), 1, "Adding one level of Fighter yields a BAB of 1");
		_test.character.classData.add([
			{ name: "Fighter", hitDieRoll: 3, lvl: 2 },
			{ name: "Fighter", hitDieRoll: 7, lvl: 3 },
			{ name: "Fighter", hitDieRoll: 2, lvl: 4 }
		]);
		equal(_test.character.ab.get("base"), 4, "Adding a total of 4 levels of Fighter yields a BAB of 4");
	});

	test("can add a Character Class level and base attack bonus is increased accordingly [Rogue]", function(){
		_test.character.classData.add([{ name: "Rogue", hitDieRoll: 4, lvl: 1 }]);
		equal(_test.character.ab.get("base"), 0, "Adding one level of Rogue yields a BAB of 0");
		_test.character.classData.add([
			{ name: "Rogue", hitDieRoll: 2, lvl: 2 },
			{ name: "Rogue", hitDieRoll: 1, lvl: 3 },
			{ name: "Rogue", hitDieRoll: 4, lvl: 4 }
		]);
		equal(_test.character.ab.get("base"), 3, "Adding a total of 4 levels of Rogue yields a BAB of 3");
	});

	test("can add a Character Class level and hitpoints are increase accordingly", function(){
		_test.character.classData.add([
			{ name: "Rogue", hitDieRoll: 4, lvl: 1 },
			{ name: "Rogue", hitDieRoll: 2, lvl: 2 },
			{ name: "Rogue", hitDieRoll: 1, lvl: 3 },
			{ name: "Rogue", hitDieRoll: 4, lvl: 4 }
		]);
		equal(_test.character.hp.get("max"), 11, "Max hit points total 11 with no CON bonus");
	});

	test("can add a Character Class level and hitpoints are increase accordingly [with CON bonus]", function(){
		_test.character.constitution.set("base",17);
		_test.character.classData.add([
			{ name: "Fighter", hitDieRoll: 4, lvl: 1 },
			{ name: "Fighter", hitDieRoll: 3, lvl: 2 },
			{ name: "Fighter", hitDieRoll: 7, lvl: 3 },
			{ name: "Fighter", hitDieRoll: 2, lvl: 4 }
		]);
		equal(_test.character.hp.get("max"), 28, "Max hit points total 11 with no CON bonus +3/level");
	});


	test("can add a Character Class level and saving throws is increased accordingly [Fighter]", function(){
		_test.character.classData.add([{ name: "Fighter", hitDieRoll: 4, lvl: 1 }]);
		equal(_test.character.fortitude.get("value"), 2, "Adding one level of Fighter yields a FOR of 2");
		_test.character.classData.add([
			{ name: "Fighter", hitDieRoll: 3, lvl: 2 },
			{ name: "Fighter", hitDieRoll: 7, lvl: 3 },
			{ name: "Fighter", hitDieRoll: 2, lvl: 4 }
		]);
		equal(_test.character.fortitude.get("value"), 4, "Adding a total of 4 levels of Fighter yields a FOR of 4");
	});

	test("can add a Character Class level and saving throws is increased accordingly [Rogue]", function(){
		_test.character.classData.add([{ name: "Rogue", hitDieRoll: 4, lvl: 1 }]);
		equal(_test.character.willpower.get("base"), 0, "Adding one level of Rogue yields a WIL of 0");
		_test.character.classData.add([
			{ name: "Rogue", hitDieRoll: 2, lvl: 2 },
			{ name: "Rogue", hitDieRoll: 1, lvl: 3 },
			{ name: "Rogue", hitDieRoll: 4, lvl: 4 }
		]);
		equal(_test.character.willpower.get("base"), 1, "Adding a total of 4 levels of Rogue yields a WIL of 1");
	});

	test("can yield a readout of all classes/levels", function(){
		_test.character.classData.add([
			{ name: "Rogue", hitDieRoll: 4, lvl: 1 },
			{ name: "Rogue", hitDieRoll: 2, lvl: 2 },
			{ name: "Rogue", hitDieRoll: 1, lvl: 3 },
			{ name: "Rogue", hitDieRoll: 4, lvl: 4 }
		]);
		_test.character.classData.add([
			{ name: "Fighter", hitDieRoll: 4, lvl: 1 },
			{ name: "Fighter", hitDieRoll: 3, lvl: 2 },
			{ name: "Fighter", hitDieRoll: 7, lvl: 3 },
			{ name: "Fighter", hitDieRoll: 2, lvl: 4 }
		]);
		equal(_test.character.classData.level, 8, "Can see all 8 levels");
		var classObject = _test.character.classData.classObj;
		equal(classObject.Fighter, 4, "Sees 4 levels of Fighter");
		equal(classObject.Rogue, 4, "Sees 4 levels of Rogue"); 
	});

