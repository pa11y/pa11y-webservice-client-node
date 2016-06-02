// This file is part of Pa11y Webservice Node.js Client.
// 
// Pa11y Webservice Node.js Client is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Pa11y Webservice Node.js Client is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Pa11y Webservice Node.js Client.  If not, see <http://www.gnu.org/licenses/>.

'use strict';

var request = require('request');

module.exports = client;

// Create a web-service client
function client (root) {
	return {

		tasks: {

			// Create a new task
			create: function (task, done) {
				post(root + 'tasks', task, done);
			},

			// Get all tasks
			get: function (query, done) {
				get(root + 'tasks', query, done);
			},

			// Get results for all tasks
			results: function (query, done) {
				get(root + 'tasks/results', query, done);
			}

		},

		task: function (id) {
			return {

				// Get a task
				get: function (query, done) {
					get(root + 'tasks/' + id, query, done);
				},

				// Edit a task
				edit: function (edits, done) {
					patch(root + 'tasks/' + id, edits, done);
				},

				// Remove a task
				remove: function (done) {
					del(root + 'tasks/' + id, null, done);
				},

				// Run a task
				run: function (done) {
					post(root + 'tasks/' + id + '/run', null, done);
				},

				// Get results for a task
				results: function (query, done) {
					get(root + 'tasks/' + id + '/results', query, done);
				},

				result: function (rid) {
					return {

						// Get a result
						get: function (query, done) {
							get(root + 'tasks/' + id + '/results/' + rid, query, done);
						}

					};
				}

			};
		}

	};
}

// Perform a DELETE request
function del (url, query, done) {
	req('DELETE', url, query, null, done);
}

// Perform a GET request
function get (url, query, done) {
	req('GET', url, query, null, done);
}

// Perform a PATCH request
function patch (url, body, done) {
	req('PATCH', url, null, body, done);
}

// Perform a POST request
function post (url, body, done) {
	req('POST', url, null, body, done);
}

// Perform a request
function req (method, url, query, body, done) {
	request({
		method: method,
		url: url,
		qs: query,
		body: body,
		json: true
	}, function (err, res, body) {
		if (err) {
			return done(err);
		}
		if (res.statusCode > 299) {
			var message = (body && body.message ? body.message : 'Error ' + res.statusCode);
			return done(new Error(message));
		}
		done(null, body);
	});
}
