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

	test("can create abilityScore to abilityScores Collection", function(){
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

	test("can create saving throw data", function(){
		equal(_test.character.saves.where({ symbol: "FOR"})[0].get("symbol"),"FOR", "Save is FOR");
		equal(_test.character.saves.where({ symbol: "REF"})[0].get("symbol"),"REF", "Save is REF");
		equal(_test.character.saves.where({ symbol: "WIL"})[0].get("symbol"),"WIL", "Save is WIL");
	});

	test("can create saves with SavingThrow model elements", function(){
		ok(_test.character.saves.where({ symbol: "FOR"})[0] instanceof app.Models.SavingThrow, "FOR is an SavingThrow");
		ok(_test.character.saves.where({ symbol: "REF"})[0] instanceof app.Models.SavingThrow, "REF is an SavingThrow");
		ok(_test.character.saves.where({ symbol: "WIL"})[0] instanceof app.Models.SavingThrow, "WIL is an SavingThrow");
	});

	test("can map saving throw to named aliases under the character", function(){
		equal(_test.character.fortitude.get("symbol"),"FOR", "Saving throw 'Fortitude' is FOR");
		equal(_test.character.reflexes.get("symbol"),"REF", "Saving throw 'Reflexes' is REF");
		equal(_test.character.willpower.get("symbol"),"WIL", "Saving throw 'Willpower' is WIL");
	});

	test("can assign base values to saving throws", function(){
		_test.character.fortitude.set("base", 2);
		equal(_test.character.fortitude.get("base"), 2, "Saving throw 'fortitude' is raised to 2");
	});

	test("can get derived value of SavingThrow Model when equal to base value", function(){
		_test.character.willpower.set("base",3);
		var value = _test.character.willpower.get('value');
		equal(_test.character.willpower.get("base"), value, "Saving throw 'willpower' value is equal to base");
	});

	test("can get updated derived value of SavingThrow Model when a new modifier is added", function(){
		_test.character.reflexes.tempAdj.add({value: 3, name: "Plus Three"});
		var value = _test.character.reflexes.get('value');
		equal((_test.character.reflexes.get("base") + 3), value, "Saving throw is modded by +3");
		_test.character.reflexes.tempAdj.add({value: 1, name: "Plus One"});
		var value2 = _test.character.reflexes.get('value');
		equal((_test.character.reflexes.get("base") + 4), value2, "Saving throw is modded by an additional +1");
		_test.character.reflexes.tempAdj.add({value: -5, name: "Minus Five"});
		var value3 = _test.character.reflexes.get('value');
		equal((_test.character.reflexes.get("base") - 1), value3, "Saving throw is modded by an additional -5");
	});

	test("can map saving throw temporary adjustment to a plain language attribute", function() {
		_test.character.fortitude.temporaryAdjustment.add({value: 3, name: "Plus Three"});
		var value = _test.character.fortitude.get('value');
		equal((_test.character.fortitude.get("base") + 3), value, "Saving throw is modded by +3 via alias");
		_test.character.fortitude.temporaryAdjustment.add({value: 1, name: "Plus One"});
		var value2 = _test.character.fortitude.get('value');
		equal((_test.character.fortitude.get("base") + 4), value2, "Saving throw is modded by an additional +1 via alias");
		_test.character.fortitude.temporaryAdjustment.add({value: -5, name: "Minus Five"});
		var value3 = _test.character.fortitude.get('value');
		equal((_test.character.fortitude.get("base") - 1), value3, "Saving throw is modded by an additional -5 via alias");
	});

