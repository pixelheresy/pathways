var _test = {};

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
