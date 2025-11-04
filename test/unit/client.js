/*
 * Copyright (c) 2024 Pa11y project's team and contributors
 * SPDX-License-Identifier: LGPL-3.0-only
 */
'use strict';

const assert = require('proclaim');

function getQueryParams(fetchCall) {
	const url = new URL(fetchCall.args[0]);
	const params = {};
	url.searchParams.forEach((value, key) => {
		params[key] = value;
	});
	return params;
}

function stringifyQuery(query) {
	const result = {};
	Object.entries(query).forEach(([key, value]) => {
		result[key] = String(value);
	});
	return result;
}

describe('pa11y-webservice-client-node', () => {
	let pwcn;
	let mockFetch;
	let originalFetch;

	beforeEach(() => {
		mockFetch = require('../mock/request-pa11y-webservice');
		mockFetch.resetHistory();

		originalFetch = global.fetch;
		global.fetch = mockFetch;

		delete require.cache[require.resolve('../../lib/client')];
		pwcn = require('../../lib/client');
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	it('should be a function', () => {
		assert.isFunction(pwcn);
	});

	it('should return an object', () => {
		assert.isObject(pwcn());
	});

	describe('[returned object]', () => {
		let client;

		beforeEach(() => {
			client = pwcn('http://pa11y-ws/');
		});

		it('should have a tasks property (object)', () => {
			assert.isObject(client.tasks);
		});

		it('should have a task method', () => {
			assert.isFunction(client.task);
		});

		describe('.tasks', () => {

			it('should have a create method', () => {
				assert.isFunction(client.tasks.create);
			});

			it('should have a get method', () => {
				assert.isFunction(client.tasks.get);
			});

			it('should have a results method', () => {
				assert.isFunction(client.tasks.results);
			});

			describe('.create()', () => {

				it('should create a task in the web-service', done => {
					client.tasks.create({
						name: 'NPG Home',
						url: 'nature.com',
						standard: 'WCAG2AA'
					}, error => {
						assert.isNull(error);
						done();
					});
				});

				it('should callback with the new task', done => {
					client.tasks.create({
						name: 'NPG Home',
						url: 'nature.com',
						standard: 'WCAG2AA'
					}, (error, task) => {
						assert.isObject(task);
						assert.isDefined(task.id);
						assert.strictEqual(task.name, 'NPG Home');
						assert.strictEqual(task.url, 'nature.com');
						assert.strictEqual(task.standard, 'WCAG2AA');
						done();
					});
				});

				it('should callback with an error if the task was not created', done => {
					client.tasks.create({}, error => {
						assert.isInstanceOf(error, Error);
						assert.strictEqual(error.message, 'foo');
						done();
					});
				});

			});

			describe('.get()', () => {

				it('should get all tasks from the web-service', done => {
					client.tasks.get({}, error => {
						assert.isNull(error);
						done();
					});
				});

				it('should use the passed in query string if present', done => {
					const query = {
						lastres: true
					};
					client.tasks.get(query, () => {
						const actualParams = getQueryParams(mockFetch.getCall(0));
						assert.deepEqual(actualParams, stringifyQuery(query));
						done();
					});
				});

				it('should callback with the recieved tasks', done => {
					client.tasks.get({}, (error, tasks) => {
						assert.isArray(tasks);
						done();
					});
				});

			});

			describe('.results()', () => {

				it('should get all results from the web-service', done => {
					client.tasks.results({}, error => {
						assert.isNull(error);
						done();
					});
				});

				it('should use the passed in query string if present', done => {
					const query = {
						from: 'foo',
						to: 'bar',
						full: true
					};
					client.tasks.results(query, () => {
						const actualParams = getQueryParams(mockFetch.getCall(0));
						assert.deepEqual(actualParams, stringifyQuery(query));
						done();
					});
				});

				it('should callback with the recieved results', done => {
					client.tasks.results({}, (error, results) => {
						assert.isArray(results);
						done();
					});
				});

				it('should callback with an error if the query is invalid', done => {
					client.tasks.results({foo: 'bar'}, error => {
						assert.isInstanceOf(error, Error);
						assert.strictEqual(error.message, 'foo');
						done();
					});
				});

			});

		});

		describe('.task()', () => {

			it('should return an object', () => {
				assert.isObject(client.task());
			});

			describe('[returned object]', () => {

				it('should have a get method', () => {
					assert.isFunction(client.task().get);
				});

				it('should have an edit method', () => {
					assert.isFunction(client.task().edit);
				});

				it('should have a remove method', () => {
					assert.isFunction(client.task().remove);
				});

				it('should have a run method', () => {
					assert.isFunction(client.task().run);
				});

				it('should have a results method', () => {
					assert.isFunction(client.task().results);
				});

				it('should have a result method', () => {
					assert.isFunction(client.task().result);
				});

				describe('.get()', () => {

					it('should get the task from the web-service', done => {
						client.task('task1').get({}, error => {
							assert.isNull(error);
							done();
						});
					});

					it('should use the passed in query string if present', done => {
						const query = {
							lastres: true
						};
						client.task('task1').get(query, () => {
							const actualParams = getQueryParams(mockFetch.getCall(0));
							assert.deepEqual(actualParams, stringifyQuery(query));
							done();
						});
					});

					it('should callback with the recieved task', done => {
						client.task('task1').get({}, (error, task) => {
							assert.isObject(task);
							assert.isDefined(task.id);
							done();
						});
					});

					it('should callback with an error if the task was not found', done => {
						client.task('task2').get({}, error => {
							assert.isInstanceOf(error, Error);
							assert.strictEqual(error.message, 'foo');
							done();
						});
					});

				});

				describe('.edit()', () => {

					it('should edit the task in the web-service', done => {
						client.task('task1').edit({}, (error, task) => {
							assert.isObject(task);
							assert.isDefined(task.id);
							done();
						});
					});

					it('should callback with an error if the task was not found', done => {
						client.task('task2').edit({}, error => {
							assert.isInstanceOf(error, Error);
							assert.strictEqual(error.message, 'foo');
							done();
						});
					});

				});

				describe('.remove()', () => {

					it('should delete the task in the web-service', done => {
						client.task('task1').remove(error => {
							assert.isNull(error);
							done();
						});
					});

					it('should callback with an error if the task was not found', done => {
						client.task('task2').remove(error => {
							assert.isInstanceOf(error, Error);
							assert.strictEqual(error.message, 'foo');
							done();
						});
					});

				});

				describe('.run()', () => {

					it('should run the task in the web-service', done => {
						client.task('task1').run(error => {
							assert.isNull(error);
							done();
						});
					});

				});

				describe('.results()', () => {

					it('should get the task\'s results from the web-service', done => {
						client.task('task1').results({}, error => {
							assert.isNull(error);
							done();
						});
					});

					it('should use the passed in query string if present', done => {
						const query = {
							from: 'foo',
							to: 'bar',
							full: true
						};
						client.task('task1').results(query, () => {
							const actualParams = getQueryParams(mockFetch.getCall(0));
							assert.deepEqual(actualParams, stringifyQuery(query));
							done();
						});
					});

					it('should callback with the recieved results', done => {
						client.task('task1').results({}, (error, results) => {
							assert.isArray(results);
							done();
						});
					});

					it('should callback with an error if the query is invalid', done => {
						client.task('task1').results({foo: 'bar'}, error => {
							assert.isInstanceOf(error, Error);
							assert.strictEqual(error.message, 'foo');
							done();
						});
					});

					it('should callback with an error if the task was not found', done => {
						client.task('task2').results({}, error => {
							assert.isInstanceOf(error, Error);
							assert.strictEqual(error.message, 'foo');
							done();
						});
					});

				});

				describe('.result()', () => {

					it('should return an object', () => {
						assert.isObject(client.task().result());
					});

					describe('[returned object]', () => {

						it('should have a get method', () => {
							assert.isFunction(client.task().get);
						});

						describe('.get()', () => {

							it('should get the result from the web-service', done => {
								client.task('task1').result('result1').get({}, error => {
									assert.isNull(error);
									done();
								});
							});

							it('should use provided query string if present', done => {
								const query = {
									full: true
								};
								client.task('task1').result('result1').get(query, () => {
									const actualParams = getQueryParams(mockFetch.getCall(0));
									assert.deepEqual(actualParams, stringifyQuery(query));
									done();
								});
							});

							it('should callback with the received result', done => {
								client.task('task1').result('result1').get({}, (error, result) => {
									assert.isObject(result);
									assert.isDefined(result.id);
									done();
								});
							});

							it('should callback with an error if result not found', done => {
								client.task('task1').result('result2').get({}, error => {
									assert.isInstanceOf(error, Error);
									assert.strictEqual(error.message, 'foo');
									done();
								});
							});
						});
					});
				});
			});
		});
	});
});
