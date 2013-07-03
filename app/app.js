define([
	"backbone.layoutmanager"
], function() {

	// Provide a global location to place configuration settings and module
	// creation.
	var app = {
		// The root path to run the application.
		root: "/"
	};

	// Localize or create a new JavaScript Template object.
	var JST = window.JST = window.JST || {};

	// Configure LayoutManager with Backbone Boilerplate defaults.
	Backbone.LayoutManager.configure({
		// Allow LayoutManager to augment Backbone.View.prototype.
		manage: true,

		prefix: "app/templates/",

		fetch: function(path) {
			// Concatenate the file extension.
			path = path + ".html";

			// If cached, use the compiled template.
			if (JST[path]) {
				return JST[path];
			}

			// Put fetch into `async-mode`.
			var done = this.async();

			// Seek out the template asynchronously.
			$.get(app.root + path, function(contents) {
				done(JST[path] = _.template(contents));
			});
		}
	});

	app.Models = {};
	app.Collections = {};

	app.calcFromTable = function(input, table, outputField) {
		if (table && table.fields) {
			var fieldIdx = table.fields.indexOf(outputField);
			var val = input;
			if (table.range) {
				var range = table.range[fieldIdx];
				if (range.min <= val && range.max >= val) {
					return table.data[val][fieldIdx];
				}
				else if (val < range.min) {
					return table.data[range.min][fieldIdx];
				}
				else if (val > range.max) {
					return table.data[range.max][fieldIdx];
				}
			}
			else return table.data[val][fieldIdx];
		}
	};

	app.tables = {};

	app.tables.abilityModTable =	{
		name: "Abilitiy Modifiers",
		source: "PRD",
		input: "Ability Score",
		fields: ["Modifier", "Bonus Spells per Day"],
		range: [{min: 0, max: 45}, {min: 10, max: 45}],
		data: {	0:	[-5, null],
				1:	[-5, null],
				2:	[-4, null],
				3:	[-4, null],
				4:	[-3, null],
				5:	[-3, null],
				6:	[-2, null],
				7:	[-2, null],
				8:	[-1, null],
				9:	[-1, null],
				10:	[0, [0,0,0,0,0,0,0,0,0,0]],
				11:	[0, [0,0,0,0,0,0,0,0,0,0]],
				12:	[1, [0,1,0,0,0,0,0,0,0,0]],
				13:	[1, [0,1,0,0,0,0,0,0,0,0]],
				14:	[2, [0,1,1,0,0,0,0,0,0,0]],
				15:	[2, [0,1,1,0,0,0,0,0,0,0]],
				16:	[3, [0,1,1,1,0,0,0,0,0,0]],
				17:	[3, [0,1,1,1,0,0,0,0,0,0]],
				18:	[4, [0,1,1,1,1,0,0,0,0,0]],
				19:	[4, [0,1,1,1,1,0,0,0,0,0]],
				20:	[5, [0,2,1,1,1,1,0,0,0,0]],
				21:	[5, [0,2,1,1,1,1,0,0,0,0]],
				22:	[6, [0,2,2,1,1,1,1,0,0,0]],
				23:	[6, [0,2,2,1,1,1,1,0,0,0]],
				24:	[7, [0,2,2,2,1,1,1,1,0,0]],
				25:	[7, [0,2,2,2,1,1,1,1,0,0]],
				26:	[8, [0,2,2,2,2,1,1,1,1,0]],
				27:	[8, [0,2,2,2,2,1,1,1,1,0]],
				28:	[9, [0,3,2,2,2,2,1,1,1,1]],
				29:	[9, [0,3,2,2,2,2,1,1,1,1]],
				30:	[10, [0,3,3,2,2,2,2,1,1,1]],
				31:	[10, [0,3,3,2,2,2,2,1,1,1]],
				32:	[11, [0,3,3,3,2,2,2,2,1,1]],
				33:	[11, [0,3,3,3,2,2,2,2,1,1]],
				34:	[12, [0,3,3,3,3,2,2,2,2,1]],
				35:	[12, [0,3,3,3,3,2,2,2,2,1]],
				36:	[13, [0,4,3,3,3,3,2,2,2,2]],
				37:	[13, [0,4,3,3,3,3,2,2,2,2]],
				38:	[14, [0,4,4,3,3,3,3,2,2,2]],
				39:	[14, [0,4,4,3,3,3,3,2,2,2]],
				40:	[15, [0,4,4,4,3,3,3,3,2,2]],
				41:	[15, [0,4,4,4,3,3,3,3,2,2]],
				42:	[16, [0,4,4,4,4,3,3,3,3,2]],
				43:	[16, [0,4,4,4,4,3,3,3,3,2]],
				44:	[17, [0,5,4,4,4,4,3,3,3,3]],
				45:	[17, [0,5,4,4,4,4,3,3,3,3]]
		}
	};

app.tables.characterClass = {};

app.tables.characterClass.Fighter = {
	name: "Fighter Class Table (Mods only)",
	source: "PRD",
	input: "Level",
	fields: ["Base Attack Bonus", "Fortitude", "Reflexes", "Willpower", "Special"],
	range: [{min: 1, max: 20}, {min: 1, max: 20}, {min: 1, max: 20}, {min: 1, max: 20}, {min: 1, max: 20}],
	data: {	0: null,
			1: [[1],				2,				0,			0,		[]],
			2: [[2],				3,				0,			0,		[]],
			3: [[3],				3,				1,			1,		[]],
			4: [[4],				4,				1,			1,		[]],
			5: [[5],				4,				1,			1,		[]],
			6: [[6,1],				5,				2,			2,		[]],
			7: [[7,2],				5,				2,			2,		[]],
			8: [[8,3],				6,				2,			2,		[]],
			9: [[9,4],				6,				3,			3,		[]],
			10: [[10,5],			7,				3,			3,		[]],
			11: [[11,6,1],			7,				3,			3,		[]],
			12: [[12,7,2],			8,				4,			4,		[]],
			13: [[13,8,3],			8,				4,			4,		[]],
			14: [[14,9,4],			9,				4,			4,		[]],
			15: [[15,10,5],			9,				5,			5,		[]],
			16: [[16,11,6,1],		10,				5,			5,		[]],
			17: [[17,12,7,2],		10,				5,			5,		[]],
			18: [[18,13,8,3],		11,				6,			6,		[]],
			19: [[19,14,9,4],		11,				6,			6,		[]],
			20: [[20,15,10,5],		20,				6,			6,		[]]
	}
};

app.tables.characterClass.Rogue = {
	name: "Rogue Class Table (Mods only)",
	source: "PRD",
	input: "Level",
	fields: ["Base Attack Bonus", "Fortitude", "Reflexes", "Willpower", "Special"],
	range: [{min: 1, max: 20}, {min: 1, max: 20}, {min: 1, max: 20}, {min: 1, max: 20}, {min: 1, max: 20}],
	data: {	0: null,
			1: [[0],				0,				2,			0,		[]],
			2: [[1],				0,				3,			0,		[]],
			3: [[2],				1,				3,			1,		[]],
			4: [[3],				1,				4,			1,		[]],
			5: [[4],				1,				4,			1,		[]],
			6: [[5],				2,				5,			2,		[]],
			7: [[6],				2,				5,			2,		[]],
			8: [[7,1],				2,				6,			2,		[]],
			9: [[7,1],				3,				6,			3,		[]],
			10: [[8,2],				3,				7,			3,		[]],
			11: [[9,3],				3,				7,			3,		[]],
			12: [[10,4],			4,				8,			4,		[]],
			13: [[10,4],			4,				8,			4,		[]],
			14: [[11,5],			4,				9,			4,		[]],
			15: [[12,6,1],			5,				9,			5,		[]],
			16: [[13,7,2],			5,				10,			5,		[]],
			17: [[13,7,2],			5,				10,			5,		[]],
			18: [[14,8,3],			6,				11,			6,		[]],
			19: [[15,9,4],			6,				11,			6,		[]],
			20: [[16,10,5],			6,				12,			6,		[]]
	}
};

	app.dice = { data:[]};
	app.dice.data = [
		app.dice.d2 =	{name: "d2", value: function() { return Math.floor(Math.random()*2)+1;} },
		app.dice.d4 =	{name: "d4", value: function() { return Math.floor(Math.random()*4)+1;} },
		app.dice.d6 =	{name: "d6", value: function() { return Math.floor(Math.random()*6)+1;} },
		app.dice.d8 =	{name: "d8", value: function() { return Math.floor(Math.random()*8)+1;} },
		app.dice.d10 =	{name: "d10", value: function() { return Math.floor(Math.random()*10)+1;} },
		app.dice.d12 =	{name: "d12", value: function() { return Math.floor(Math.random()*12)+1;} },
		app.dice.d20 =	{name: "d20", value: function() { return Math.floor(Math.random()*20)+1;} },
		app.dice.d100 =	{name: "d100", value: function() { return Math.floor(Math.random()*100)+1;} }
	];

	/*
		"1d4 + 3" == { d4: 1, mod: 3 }
		"3d8 - 4" == { d8: 3, mod: -1 }
		"4d6 drop lowest" == { d6: 4, drop: 1 }
		"1d20, best of two attempts" == { d20: 2, drop: 1}
		"2d10, reroll 1s" == { d10: 2, reroll: 1 }
		"1d8 + 2; critical hit multiplier of x2" == { d8: 1, mod: 2, multiplier: 2 }

	*/
	app.roll = function(rollObject) {
		var value = 0;
		var rolls = [];
		var dropped = [];
		var multiplier = (rollObject.multiplier) ? rollObject.multiplier : 1;
		var revSort = function (a,b) { return b - a; };
		for (var i = 0; i < multiplier; i++) {
			rolls[i] = [];
			dropped[i] = [];
			var minimum = (rollObject.min) ? rollObject.min : 0;
			for (var j = 0; j < app.dice.data.length; j++) {
				var die = app.dice.data[j].name;
				if (rollObject[die]) {
					for (var k = 0; k < rollObject[die]; k++) {
						var result = app.dice[die].value();
						if (rollObject.reroll) while (result <= rollObject.reroll) { result = app.dice[die].value(); }
						rolls[i].push(app.dice[die].value());
					}
				}
			}
			if (rollObject.drop) {
				rolls[i].sort(revSort);
				for (var l = 0; l < rollObject.drop; l++) {
					if (rolls[i].length) dropped[i].push(rolls[i].pop());
				}
			}
			for (var m = 0; m < rolls[i].length; m++) { value += rolls[i][m]; }
			if (rollObject.mod) value += rollObject.mod;
			if (value < minimum) value = minimum;
		}
		if (rollObject.show) {
			var valueObj = { "value" : value, "rolls" : rolls };
			if (rollObject.drop) valueObj.dropped = dropped;
			return valueObj;
		}
		else return value;
	};

	// Mix Backbone.Events, modules, and layout management into the app object.
	return _.extend(app, {
		// Create a custom object with a nested Views object.
		module: function(additionalProps) {
			return _.extend({ Views: {} }, additionalProps);
		},

		// Helper for using layouts.
		useLayout: function(options) {
			// Create a new Layout with options.
			var layout = new Backbone.Layout(_.extend({
				el: "body"
			}, options));

			// Cache the refererence.
			return this.layout = layout;
		}
	}, Backbone.Events);

 });

