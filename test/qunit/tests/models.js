var _test = {};

module("Character Model",{
	setup: function() {
		_test.character = new app.Models.Character();
	},

	teardown: function() {
		_test.character.destroy();
		delete _test.character;
	}
});

	test("can assign name to model", function(){
		_test.character.set("name","Gandalf");
		equal(_test.character.get("name"),"Gandalf","Named character is 'Gandalf'");
	});

	test("can create AbilityScores Collection to abilityScores", function(){
		equal(_test.character.abilityScores.where({ symbol: "STR"})[0].get("symbol"),"STR", "Ability score is STR");
		equal(_test.character.abilityScores.where({ symbol: "DEX"})[0].get("symbol"),"DEX", "Ability score is DEX");
		equal(_test.character.abilityScores.where({ symbol: "CON"})[0].get("symbol"),"CON", "Ability score is CON");
		equal(_test.character.abilityScores.where({ symbol: "INT"})[0].get("symbol"),"INT", "Ability score is INT");
		equal(_test.character.abilityScores.where({ symbol: "WIS"})[0].get("symbol"),"WIS", "Ability score is WIS");
		equal(_test.character.abilityScores.where({ symbol: "CHA"})[0].get("symbol"),"CHA", "Ability score is CHA");
	});

	test("can create abilityScores with AbilityScore model elements", function(){
		ok(_test.character.abilityScores.where({ symbol: "STR"})[0] instanceof app.Models.AbilityScore, "STR is an AbilityScore");
		ok(_test.character.abilityScores.where({ symbol: "DEX"})[0] instanceof app.Models.AbilityScore, "DEX is an AbilityScore");
		ok(_test.character.abilityScores.where({ symbol: "CON"})[0] instanceof app.Models.AbilityScore, "CON is an AbilityScore");
		ok(_test.character.abilityScores.where({ symbol: "INT"})[0] instanceof app.Models.AbilityScore, "INT is an AbilityScore");
		ok(_test.character.abilityScores.where({ symbol: "WIS"})[0] instanceof app.Models.AbilityScore, "WIS is an AbilityScore");
		ok(_test.character.abilityScores.where({ symbol: "CHA"})[0] instanceof app.Models.AbilityScore, "CHA is an AbilityScore");
	});

	test("can map ability scores to named aliases under the character", function(){
		equal(_test.character.strength.get("symbol"),"STR", "Ability score 'strength' is STR");
		equal(_test.character.dexterity.get("symbol"),"DEX", "Ability score 'dexterity' is DEX");
		equal(_test.character.constitution.get("symbol"),"CON", "Ability score 'constitution' is CON");
		equal(_test.character.intelligence.get("symbol"),"INT", "Ability score 'intelligence' is INT");
		equal(_test.character.wisdom.get("symbol"),"WIS", "Ability score 'wisdom' is WIS");
		equal(_test.character.charisma.get("symbol"),"CHA", "Ability score 'charisma' is CHA");
	});

	test("can assign base values to abilityScores", function(){
		_test.character.strength.set("base", 18);
		equal(_test.character.strength.get("base"), 18, "Ability score 'strength' is raised to 18");
	});

	test("can get derived value of AbilityScore Model when equal to base value", function(){
		var value = _test.character.strength.get('value');
		equal(_test.character.strength.get("base"), value, "Ability score 'strength' value is equal to base");
	});

	test("can get updated derived value of AbilityScore Model when a new modifier is added", function(){
		_test.character.strength.tempAdj.add({value: 3, name: "Plus Three"});
		var value = _test.character.strength.get('value');
		equal((_test.character.strength.get("base") + 3), value, "Ability score is modded by +3");
		_test.character.strength.tempAdj.add({value: 1, name: "Plus One"});
		var value2 = _test.character.strength.get('value');
		equal((_test.character.strength.get("base") + 4), value2, "Ability score is modded by an additional +1");
		_test.character.strength.tempAdj.add({value: -5, name: "Minus Five"});
		var value3 = _test.character.strength.get('value');
		equal((_test.character.strength.get("base") - 1), value3, "Ability score is modded by an additional -5");
	});

	test("can map ability score temporary adjustment to a plain language attribute", function() {
		_test.character.dexterity.temporaryAdjustment.add({value: 3, name: "Plus Three"});
		var value = _test.character.dexterity.get('value');
		equal((_test.character.dexterity.get("base") + 3), value, "Ability score is modded by +3 via alias");
		_test.character.dexterity.temporaryAdjustment.add({value: 1, name: "Plus One"});
		var value2 = _test.character.dexterity.get('value');
		equal((_test.character.dexterity.get("base") + 4), value2, "Ability score is modded by an additional +1 via alias");
		_test.character.dexterity.temporaryAdjustment.add({value: -5, name: "Minus Five"});
		var value3 = _test.character.dexterity.get('value');
		equal((_test.character.dexterity.get("base") - 1), value3, "Ability score is modded by an additional -5 via alias");
	});

	test("can create a derived object to hold Armor Class", function() {
		equal(_test.character.ac.get("base"), 10, "Base AC is 10");
	});

	test("can map AC to armorClass", function() {
		_test.character.armorClass.set("base", 9);
		equal(_test.character.ac.get("base"), 9, "Base AC is set to 9 via alias");
	});

	test("can create an array with default mod sets [each ModifierContainer Collections]", function() {
		ok(_test.character.ac.abilityModifier instanceof app.Collections.ModifierContainer, "abilityModifier is a ModifierContainer");
		ok(_test.character.ac.armorBonus instanceof app.Collections.ModifierContainer, "armorBonus is a ModifierContainer");
		ok(_test.character.ac.shieldBonus instanceof app.Collections.ModifierContainer, "shieldBonus is a ModifierContainer");
		ok(_test.character.ac.naturalArmor instanceof app.Collections.ModifierContainer, "naturalArmor is a ModifierContainer");
		ok(_test.character.ac.deflectionModifier instanceof app.Collections.ModifierContainer, "deflectionModifier is a ModifierContainer");
		ok(_test.character.ac.dodgeBonus instanceof app.Collections.ModifierContainer, "dodgeBonus is a ModifierContainer");
		ok(_test.character.ac.otherDefense instanceof app.Collections.ModifierContainer, "otherDefense is a ModifierContainer");
	});

	test("can instantiate an AC Ability Modifier that updates value properly [by sum]", function(){
		_test.character.ac.abilityModifier.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ac.get("value"), 15, "All AC Ability Modifier values equal +5");
	});

	test("can instantiate an AC Armor Bonus that updates value properly [by highest]", function(){
		_test.character.ac.armorBonus.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ac.get("value"), 13, "All AC Armor Bonus values equal +3");
	});

	test("can instantiate an AC Shield Bonus that updates value properly [by highest]", function(){
		_test.character.ac.shieldBonus.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ac.get("value"), 13, "All AC Shield Bonus values equal +3");
	});

	test("can instantiate an AC Natural Armor Bonus that updates value properly [by highest]", function(){
		_test.character.ac.naturalArmor.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ac.get("value"), 13, "All AC Natural Armor Bonus values equal +3");
	});

	test("can instantiate an AC Deflection Modifier that updates value properly [by highest]", function(){
		_test.character.ac.deflectionModifier.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ac.get("value"), 13, "All AC Deflection Modifier values equal +3");
	});

	test("can instantiate an AC Dodge Bonus that updates value properly [by sum]", function(){
		_test.character.ac.dodgeBonus.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ac.get("value"), 15, "All AC Dodge Bonus values equal +5");
	});

	test("can instantiate an AC Other Defense Modifiers that updates value properly [by sum]", function(){
		_test.character.ac.otherDefense.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ac.get("value"), 15, "All AC Other Defense Modifiers values equal +5");
	});

	test("can calculate total AC by all modifiers", function(){
		_test.character.ac.abilityModifier.add([{ name:"Dex Modifier", value: 2 }]);
		_test.character.ac.armorBonus.add([{ name:"Leather Armor", value: 2 }]);
		_test.character.ac.shieldBonus.add([{ name:"Buckler", value: 1 }]);
		_test.character.ac.naturalArmor.add([{ name:"Natural Hide", value: 1 }]);
		_test.character.ac.deflectionModifier.add([{ name:"Ring of Protection +2", value: 2 }, { name:"Shield of Stability", value: 2 }]);
		_test.character.ac.dodgeBonus.add([{ name: "Haste", value: 1 }, { name: "Dodge (Feat)", value: 1 }]);
		_test.character.ac.otherDefense.add([{ name: "Other Bonus", value: 1}]);
		equal(_test.character.ac.get("value"), 21, "All AC bonuses provide a total of +11");
	});

	test("can create a derived object to hold Attack Bonus", function() {
		equal(_test.character.ab.get("base"), 0, "Base Attack Bonus is 0");
	});

	test("can map AB to attackBonus", function() {
		_test.character.attackBonus.set("base", 2);
		equal(_test.character.ab.get("base"), 2, "Base Attack Bonus is set to 9 via alias");
	});

	test("can create an array in AB with default mod sets [each ModifierContainer Collections]", function() {
		ok(_test.character.ab.abilityModifier instanceof app.Collections.ModifierContainer, "abilityModifier is a ModifierContainer");
		ok(_test.character.ab.weaponBonus instanceof app.Collections.ModifierContainer, "weaponBonus is a ModifierContainer");
		ok(_test.character.ab.sizeModifier instanceof app.Collections.ModifierContainer, "sizeModifier is a ModifierContainer");
		ok(_test.character.ab.otherAttack instanceof app.Collections.ModifierContainer, "otherAttack is a ModifierContainer");
	});

	test("can instantiate an AB Ability Modifier that updates value properly [by sum]", function(){
		_test.character.ab.abilityModifier.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ab.get("value"), 5, "All AB Ability Modifier values equal +5");
	});

	test("can instantiate an AB Weapon Bonus that updates value properly [by highest]", function(){
		_test.character.ab.weaponBonus.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ab.get("value"), 3, "All AB Weapon Bonus values equal +3");
	});

	test("can instantiate an AB Size Modifier that updates value properly [by only]", function(){
		_test.character.ab.sizeModifier.add([{ name:"Mod 1", value: 2 }]);
		_test.character.ab.sizeModifier.add([{ name:"Mod 2", value: 3 }]);
		equal(_test.character.ab.get("value"), 3, "All AB Size Modifier values equal +3");
	});

	test("can instantiate an AB Other Attack Modifiers that updates value properly [by highest]", function(){
		_test.character.ab.otherAttack.add([{ name:"Mod 1", value: 2 }, { name:"Mod 2", value: 3 }]);
		equal(_test.character.ab.get("value"), 5, "All AB Other Attack Modifiers values equal +5");
	});

	test("can calculate total AB by all modifiers", function(){
		_test.character.ab.abilityModifier.add([{ name: "Strength Modifier", value: 2}]);
		_test.character.ab.weaponBonus.add([{ name: "Enchantment +1", value: 1 }]);
		_test.character.ab.sizeModifier.add([{ name: "Small", value: -1 }]);
		_test.character.ab.otherAttack.add([{ name: "Other Bonus", value: 1}]);
		equal(_test.character.ab.get("value"), 3, "All Attack bonuses provide a total of +3");
	});

	test("can add status to characters", function(){
		equal(_test.character.statusEffects.length, 0, "No status effects to start");
		_test.character.statusEffects.add("Prone");
		equal(_test.character.statusEffects.length, 1, "One status effect added");
	});

	test("can remove status from characters", function(){
		equal(_test.character.statusEffects.length, 0, "No status effects to start");
		_test.character.statusEffects.add("Prone");
		equal(_test.character.statusEffects.length, 1, "One status effect added");
		_test.character.statusEffects.remove("Prone");
		equal(_test.character.statusEffects.length, 0, "No status effects to finish");
	});

	test("can fail gracefully is requested to remove a status that doesn't exist", function(){
		equal(_test.character.statusEffects.length, 0, "No status effects to start");
		_test.character.statusEffects.add("Prone");
		equal(_test.character.statusEffects.length, 1, "One status effect added");
		_test.character.statusEffects.remove("Hastened");
		equal(_test.character.statusEffects.length, 1, "One status effect to finish");
	});

	test("can add multiple statuses to characters at once", function(){
		equal(_test.character.statusEffects.length, 0, "No status effects to start");
		_test.character.statusEffects.add(["Prone","Hastened"]);
		equal(_test.character.statusEffects.length, 2, "Two status effects added");
	});

	test("can remove multiple statuses to characters at once", function(){
		equal(_test.character.statusEffects.length, 0, "No status effects to start");
		_test.character.statusEffects.add(["Prone","Hastened"]);
		equal(_test.character.statusEffects.length, 2, "Two status effects added");
		_test.character.statusEffects.remove(["Hastened","Prone"]);
		equal(_test.character.statusEffects.length, 0, "No status effects to finish");
	});

	test("can add traits to contestTraits to set conditions for contest roll", function(){
		equal(_test.character.contestTraits.length, 0, "No traits to start");
		_test.character.contestTraits.add(["Attack Type","Melee"]);
		equal(_test.character.contestTraits.length, 1, "One traits added");
	});

	test("can remove traits from characters", function(){
		equal(_test.character.contestTraits.length, 0, "No traits to start");
		_test.character.contestTraits.add(["Attack Type","Melee"]);
		equal(_test.character.contestTraits.length, 1, "One trait added");
		_test.character.contestTraits.remove(["Attack Type","Melee"]);
		equal(_test.character.contestTraits.length, 0, "No traits to finish");
	});

	test("can add multiple traits from characters at once", function(){
		equal(_test.character.contestTraits.length, 0, "No traits to start");
		_test.character.contestTraits.add([["Attack Type","Melee"],["Spell-Effect","Invisible"]]);
		equal(_test.character.contestTraits.length, 2, "Two traits added");
	});

	test("can remove multiple traits from characters at once", function(){
		equal(_test.character.contestTraits.length, 0, "No traits to start");
		_test.character.contestTraits.add([["Attack Type","Melee"],["Spell-Effect","Invisible"]]);
		equal(_test.character.contestTraits.length, 2, "Two traits added");
		_test.character.contestTraits.remove([["Spell-Effect","Invisible"],["Attack Type","Melee"]]);
		equal(_test.character.contestTraits.length, 0, "No traits to finish");
	});


module("Dice");
	test("can roll dice of each type", function(){
		expect(8);
		var d2 = app.roll({d2: 1});
		var d4 = app.roll({d4: 1});
		var d6 = app.roll({d6: 1});
		var d8 = app.roll({d8: 1});
		var d10 = app.roll({d10: 1});
		var d12 = app.roll({d12: 1});
		var d20 = app.roll({d20: 1});
		var d100 = app.roll({d100: 1});
		ok ((1 <= d2 && d2 <= 2), "d2 in range");
		ok ((1 <= d4 && d4 <= 4), "d4 in range");
		ok ((1 <= d6 && d6 <= 6), "d6 in range");
		ok ((1 <= d8 && d8 <= 8), "d8 in range");
		ok ((1 <= d10 && d10 <= 10), "d10 in range");
		ok ((1 <= d12 && d12 <= 12), "d12 in range");
		ok ((1 <= d20 && d20 <= 20), "d20 in range");
		ok ((1 <= d100 && d100 <= 100), "d100 in range");
	});

	test("can take modifiers", function(){
		expect(8);
		var d2 = app.roll({d2: 1, mod: 2});
		var d4 = app.roll({d4: 1, mod: 2});
		var d6 = app.roll({d6: 1, mod: 2});
		var d8 = app.roll({d8: 1, mod: 2});
		var d10 = app.roll({d10: 1, mod: 2});
		var d12 = app.roll({d12: 1, mod: 2});
		var d20 = app.roll({d20: 1, mod: 2});
		var d100 = app.roll({d100: 1, mod: 2});
		ok ((3 <= d2 && d2 <= 2+2), "d2 in range");
		ok ((3 <= d4 && d4 <= 2+4), "d4 in range");
		ok ((3 <= d6 && d6 <= 2+6), "d6 in range");
		ok ((3 <= d8 && d8 <= 2+8), "d8 in range");
		ok ((3 <= d10 && d10 <= 2+10), "d10 in range");
		ok ((3 <= d12 && d12 <= 2+12), "d12 in range");
		ok ((3 <= d20 && d20 <= 2+20), "d20 in range");
		ok ((3 <= d100 && d100 <= 2+100), "d100 in range");
	});

	test("can output the results as an object showing each natural die roll", function(){
		expect(8);
		var d2Obj = app.roll({d2: 3, mod: 2, show: true});
		var d4Obj = app.roll({d4: 3, mod: 2, show: true});
		var d6Obj = app.roll({d6: 3, mod: 2, show: true});
		var d8Obj = app.roll({d8: 3, mod: 2, show: true});
		var d10Obj = app.roll({d10: 3, mod: 2, show: true});
		var d12Obj = app.roll({d12: 3, mod: 2, show: true});
		var d20Obj = app.roll({d20: 3, mod: 2, show: true});
		var d100Obj = app.roll({d100: 3, mod: 2, show: true});
		equal((d2Obj.rolls[0][0]+d2Obj.rolls[0][1]+d2Obj.rolls[0][2]+2), d2Obj.value, "internal rolls + mod = value");
		equal((d4Obj.rolls[0][0]+d4Obj.rolls[0][1]+d4Obj.rolls[0][2]+2), d4Obj.value, "internal rolls + mod = value");
		equal((d6Obj.rolls[0][0]+d6Obj.rolls[0][1]+d6Obj.rolls[0][2]+2), d6Obj.value, "internal rolls + mod = value");
		equal((d8Obj.rolls[0][0]+d8Obj.rolls[0][1]+d8Obj.rolls[0][2]+2), d8Obj.value, "internal rolls + mod = value");
		equal((d10Obj.rolls[0][0]+d10Obj.rolls[0][1]+d10Obj.rolls[0][2]+2), d10Obj.value, "internal rolls + mod = value");
		equal((d12Obj.rolls[0][0]+d12Obj.rolls[0][1]+d12Obj.rolls[0][2]+2), d12Obj.value, "internal rolls + mod = value");
		equal((d20Obj.rolls[0][0]+d20Obj.rolls[0][1]+d20Obj.rolls[0][2]+2), d20Obj.value, "internal rolls + mod = value");
		equal((d100Obj.rolls[0][0]+d100Obj.rolls[0][1]+d100Obj.rolls[0][2]+2), d100Obj.value, "internal rolls + mod = value");
	});

	test("can roll multiples of each type", function(){
		expect(8);
		var d2 = app.roll({d2: 3});
		var d4 = app.roll({d4: 3});
		var d6 = app.roll({d6: 3});
		var d8 = app.roll({d8: 3});
		var d10 = app.roll({d10: 3});
		var d12 = app.roll({d12: 3});
		var d20 = app.roll({d20: 3});
		var d100 = app.roll({d100: 3});
		ok ((3 <= d2 && d2 <= 3*2), "d2 in range");
		ok ((3 <= d4 && d4 <= 3*4), "d4 in range");
		ok ((3 <= d6 && d6 <= 3*6), "d6 in range");
		ok ((3 <= d8 && d8 <= 3*8), "d8 in range");
		ok ((3 <= d10 && d10 <= 3*10), "d10 in range");
		ok ((3 <= d12 && d12 <= 3*12), "d12 in range");
		ok ((3 <= d20 && d20 <= 3*20), "d20 in range");
		ok ((3 <= d100 && d100 <= 3*100), "d100 in range");
	});

	test("can roll multiples and drop the lowest", function(){
		expect(8);
		var d2 = app.roll({d2: 3, drop: 1});
		var d4 = app.roll({d4: 3, drop: 1});
		var d6 = app.roll({d6: 3, drop: 1});
		var d8 = app.roll({d8: 3, drop: 1});
		var d10 = app.roll({d10: 3, drop: 1});
		var d12 = app.roll({d12: 3, drop: 1});
		var d20 = app.roll({d20: 3, drop: 1});
		var d100 = app.roll({d100: 3, drop: 1});
		ok ((2 <= d2 && d2 <= 2*2), "d2 in range");
		ok ((2 <= d4 && d4 <= 2*4), "d4 in range");
		ok ((2 <= d6 && d6 <= 2*6), "d6 in range");
		ok ((2 <= d8 && d8 <= 2*8), "d8 in range");
		ok ((2 <= d10 && d10 <= 2*10), "d10 in range");
		ok ((2 <= d12 && d12 <= 2*12), "d12 in range");
		ok ((2 <= d20 && d20 <= 2*20), "d20 in range");
		ok ((2 <= d100 && d100 <= 2*100), "d100 in range");
	});

	test("can apply a global multiplier, stacking roll sets", function(){
		expect(8);
		var d2Obj = app.roll({d2: 1, mod: 2, multiplier: 2, show: true});
		var d4Obj = app.roll({d4: 1, mod: 2, multiplier: 2, show: true});
		var d6Obj = app.roll({d6: 1, mod: 2, multiplier: 2, show: true});
		var d8Obj = app.roll({d8: 1, mod: 2, multiplier: 2, show: true});
		var d10Obj = app.roll({d10: 1, mod: 2, multiplier: 2, show: true});
		var d12Obj = app.roll({d12: 1, mod: 2, multiplier: 2, show: true});
		var d20Obj = app.roll({d20: 1, mod: 2, multiplier: 2, show: true});
		var d100Obj = app.roll({d100: 1, mod: 2, multiplier: 2, show: true});
		equal((d2Obj.rolls[0][0]+2+d2Obj.rolls[1][0]+2), d2Obj.value, "each individual roll stacks with multiplier");
		equal((d4Obj.rolls[0][0]+2+d4Obj.rolls[1][0]+2), d4Obj.value, "each individual roll stacks with multiplier");
		equal((d6Obj.rolls[0][0]+2+d6Obj.rolls[1][0]+2), d6Obj.value, "each individual roll stacks with multiplier");
		equal((d8Obj.rolls[0][0]+2+d8Obj.rolls[1][0]+2), d8Obj.value, "each individual roll stacks with multiplier");
		equal((d10Obj.rolls[0][0]+2+d10Obj.rolls[1][0]+2), d10Obj.value, "each individual roll stacks with multiplier");
		equal((d12Obj.rolls[0][0]+2+d12Obj.rolls[1][0]+2), d12Obj.value, "each individual roll stacks with multiplier");
		equal((d20Obj.rolls[0][0]+2+d20Obj.rolls[1][0]+2), d20Obj.value, "each individual roll stacks with multiplier");
		equal((d100Obj.rolls[0][0]+2+d100Obj.rolls[1][0]+2), d100Obj.value, "each individual roll stacks with multiplier");

	});

	test("can always stay in range", function(){
		expect(8);
		function multiRoller(die, max, rolls) {
			var dXBool = true;
			for (var i = 0; i < rolls; i++) {
				var rollObj = {};
				rollObj[die] = 1;
				var dX = app.roll(rollObj);
				if (1 > dX || dX > max){
					dXBool = false;
					i = rolls;
				}
			}
			return dXBool;
		}
		var d2Bool = multiRoller('d2', 2, 1000);
		var d4Bool = multiRoller('d4', 4, 1000);
		var d6Bool = multiRoller('d6', 6, 1000);
		var d8Bool = multiRoller('d8', 8, 1000);
		var d10Bool = multiRoller('d10', 10, 1000);
		var d12Bool = multiRoller('d12', 12, 1000);
		var d20Bool = multiRoller('d20', 20, 1000);
		var d100Bool = multiRoller('d100', 100, 1000);
		ok(d2Bool, "d2 in range");
		ok(d4Bool, "d4 in range");
		ok(d6Bool, "d6 in range");
		ok(d8Bool, "d8 in range");
		ok(d10Bool, "d10 in range");
		ok(d12Bool, "d12 in range");
		ok(d20Bool, "d20 in range");
		ok(d100Bool, "d100 in range");
	});

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

	
