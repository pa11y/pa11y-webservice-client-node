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

const request = require('request');

function client(root) {
	return {
		tasks: {
			create(task, done) {
				post(`${root}tasks`, task, done);
			},
			get(query, done) {
				get(`${root}tasks`, query, done);
			},
			results(query, done) {
				get(`${root}tasks/results`, query, done);
			}
		},
		task(id) {
			return {
				get(query, done) {
					get(`${root}tasks/${id}`, query, done);
				},
				edit(edits, done) {
					patch(`${root}tasks/${id}`, edits, done);
				},
				remove(done) {
					del(`${root}tasks/${id}`, null, done);
				},
				run(done) {
					post(`${root}tasks/${id}/run`, null, done);
				},
				results(query, done) {
					get(`${root}tasks/${id}/results`, query, done);
				},
				result(rid) {
					return {
						get(query, done) {
							get(`${root}tasks/${id}/results/${rid}`, query, done);
						}
					};
				}
			};
		}
	};
}

function del(url, query, done) {
	call({
		method: 'DELETE',
		url,
		query
	}, done);
}

function get(url, query, done) {
	call({
		method: 'GET',
		url,
		query
	}, done);
}

function patch(url, body, done) {
	call({
		method: 'PATCH',
		url,
		body
	}, done);
}

function post(url, body, done) {
	call({
		method: 'POST',
		url,
		body
	}, done);
}

function call({method, url, query, body}, done) {
	request({
		method,
		url,
		qs: query,
		body,
		json: true
	}, (error, response, responseBody) => {
		if (error) {
			return done(error);
		}
		if (response.statusCode >= 300) {
			const message = (responseBody?.message || `Error ${response.statusCode}`);
			return done(new Error(message));
		}
		done(null, responseBody);
	});
}

module.exports = client;
