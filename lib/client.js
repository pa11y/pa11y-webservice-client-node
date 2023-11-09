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

			create: function (task, done) {
				post(root + 'tasks', task, done);
			},

			get: function (query, done) {
				get(root + 'tasks', query, done);
			},

			results: function (query, done) {
				get(root + 'tasks/results', query, done);
			}

		},

		task: function (id) {
			return {

				get: function (query, done) {
					get(root + 'tasks/' + id, query, done);
				},

				edit: function (edits, done) {
					patch(root + 'tasks/' + id, edits, done);
				},

				remove: function (done) {
					del(root + 'tasks/' + id, null, done);
				},

				run: function (done) {
					post(root + 'tasks/' + id + '/run', null, done);
				},

				results: function (query, done) {
					get(root + 'tasks/' + id + '/results', query, done);
				},

				result: function (rid) {
					return {

						get: function (query, done) {
							get(root + 'tasks/' + id + '/results/' + rid, query, done);
						}
					};
				}
			};
		}
	};
}

function del (url, query, done) {
	req('DELETE', url, query, null, done);
}

function get (url, query, done) {
	req('GET', url, query, null, done);
}

function patch (url, body, done) {
	req('PATCH', url, null, body, done);
}

function post (url, body, done) {
	req('POST', url, null, body, done);
}

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
