require([
	// Application
	"app",
	"main",

	// *** TEST *** //
	"ruleset/test",
	"tests/01-character",
	"tests/02-dice",
	"tests/03-rules",
	"tests/04-characterjson",
	"tests/05-characterclass"
],

function(app, main, testRules) {

	// *** TEST *** //
	window.testRules = testRules;
	window.app = app;
	if (QUnit) QUnit.start();

});
