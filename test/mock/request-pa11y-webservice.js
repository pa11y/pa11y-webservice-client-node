/*
 * Copyright (c) 2024 Pa11y project's team and contributors
 * SPDX-License-Identifier: LGPL-3.0-only
 */
'use strict';

const sinon = require('sinon');

module.exports = sinon.spy((opts, done) => {
	const endpoint = `${opts.method} ${opts.url}`;
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

const mockEndpoints = {

	'GET http://pa11y-ws/tasks'(query, body, done) {
		return done(null, {statusCode: 200}, []);
	},

	'POST http://pa11y-ws/tasks'(query, body, done) {
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

	'GET http://pa11y-ws/tasks/results'(query, body, done) {
		if (query.foo) {
			return done(null, {statusCode: 400}, {
				code: 400,
				error: 'Bad Request',
				message: 'foo'
			});
		}
		return done(null, {statusCode: 200}, []);
	},

	'GET http://pa11y-ws/tasks/task1'(query, body, done) {
		return done(null, {statusCode: 200}, mockTask);
	},

	'PATCH http://pa11y-ws/tasks/task1'(query, body, done) {
		return done(null, {statusCode: 204}, mockTask);
	},

	'DELETE http://pa11y-ws/tasks/task1'(query, body, done) {
		return done(null, {statusCode: 204}, null);
	},

	'POST http://pa11y-ws/tasks/task1/run'(query, body, done) {
		return done(null, {statusCode: 202}, null);
	},

	'GET http://pa11y-ws/tasks/task1/results'(query, body, done) {
		if (query.foo) {
			return done(null, {statusCode: 400}, {
				code: 400,
				error: 'Bad Request',
				message: 'foo'
			});
		}
		return done(null, {statusCode: 200}, []);
	},

	'GET http://pa11y-ws/tasks/task1/results/result1'(query, body, done) {
		return done(null, {statusCode: 200}, mockResult);
	}

};

const mockTask = {
	id: 'task1',
	name: 'NPG Home',
	url: 'nature.com',
	standard: 'WCAG2AA',
	ignore: []
};

const mockResult = {
	id: 'result1',
	task: 'task1'
};
