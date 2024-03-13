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

const assert = require('proclaim');
const mockery = require('mockery');

describe('pa11y-webservice-client-node', () => {
	let pwcn;
	let request;

	beforeEach(() => {
		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false,
			warnOnReplace: false
		});

		request = require('../mock/request-pa11y-webservice');
		mockery.registerMock('request', request);

		pwcn = require('../../lib/client');
	});

	afterEach(() => {
		mockery.disable();
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
						assert.deepEqual(request.getCall(0).args[0].qs, query);
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
						assert.deepEqual(request.getCall(0).args[0].qs, query);
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
							assert.deepEqual(request.getCall(0).args[0].qs, query);
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
							assert.deepEqual(request.getCall(0).args[0].qs, query);
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
									assert.deepEqual(request.getCall(0).args[0].qs, query);
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
