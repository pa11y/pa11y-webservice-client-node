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

var sinon = require('sinon');

module.exports = sinon.spy(function (opts, done) {
	var endpoint = opts.method + ' ' + opts.url;
	if (mockEndpoints[endpoint]) {
		mockEndpoints[endpoint](opts.qs, opts.body, done);
	} else {
		done(null, {statusCode: 404}, {
			code: 404,
			error: 'Not Found',
			message: 'foo'
		});
	}
});

var mockEndpoints = {

	'GET http://pa11y-ws/tasks': function (query, body, done) {
		return done(null, {statusCode: 200}, []);
	},

	'POST http://pa11y-ws/tasks': function (query, body, done) {
		if (body.name && body.url && body.standard) {
			return done(null, {statusCode: 201}, {
				id: 'task1',
				name: body.name,
				url: body.url,
				standard: body.standard,
				ignore: body.ignore || []
			});
		}
		return done(null, {statusCode: 400}, {
			code: 400,
			error: 'Bad Request',
			message: 'foo'
		});
	},

	'GET http://pa11y-ws/tasks/results': function (query, body, done) {
		if (query.foo) {
			return done(null, {statusCode: 400}, {
				code: 400,
				error: 'Bad Request',
				message: 'foo'
			});
		}
		return done(null, {statusCode: 200}, []);
	},

	'GET http://pa11y-ws/tasks/task1': function (query, body, done) {
		return done(null, {statusCode: 200}, mockTask);
	},

	'PATCH http://pa11y-ws/tasks/task1': function (query, body, done) {
		return done(null, {statusCode: 204}, mockTask);
	},

	'DELETE http://pa11y-ws/tasks/task1': function (query, body, done) {
		return done(null, {statusCode: 204}, null);
	},

	'POST http://pa11y-ws/tasks/task1/run': function (query, body, done) {
		return done(null, {statusCode: 202}, null);
	},

	'GET http://pa11y-ws/tasks/task1/results': function (query, body, done) {
		if (query.foo) {
			return done(null, {statusCode: 400}, {
				code: 400,
				error: 'Bad Request',
				message: 'foo'
			});
		}
		return done(null, {statusCode: 200}, []);
	},

	'GET http://pa11y-ws/tasks/task1/results/result1': function (query, body, done) {
		return done(null, {statusCode: 200}, mockResult);
	}

};

var mockTask = {
	id: 'task1',
	name: 'NPG Home',
	url: 'nature.com',
	standard: 'WCAG2AA',
	ignore: []
};

var mockResult = {
	id: 'result1',
	task: 'task1'
};
