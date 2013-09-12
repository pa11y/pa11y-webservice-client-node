'use strict';

module.exports = client;

// Create a web-service client
function client () {
	return {

		tasks: {

			// Create a new task
			create: function () {},

			// Get all tasks
			get: function () {},

			// Get results for all tasks
			results: function () {}

		},

		task: function () {
			return {

				// Get a task
				get: function () {},

				// Remove a task
				remove: function () {},

				// Get results for a task
				results: function () {}

			};
		}

	};
}
