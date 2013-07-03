// Set the require.js configuration for your application.
require.config({
	baseUrl: "../../app/",
	// Initialize the application with the main application file and the JamJS
	// generated configuration file.
	deps: ["../vendor/jam/require.config", "../test/qunit/main"],

	paths: {
		ruleset: "ruleset",
		tests: "../test/qunit/tests"
	},

	shim: {
		// Put shims here.
	}

});
