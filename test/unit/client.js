/* global afterEach, beforeEach, describe, it */
/* jshint maxlen: false, maxstatements: false */
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');

describe('pa11y-webservice-client-node', function () {
	var pwcn, request;

	beforeEach(function () {

		mockery.enable({
			useCleanCache: true,
			warnOnUnregistered: false,
			warnOnReplace: false
		});

		request = require('../mock/request-pa11y-webservice');
		mockery.registerMock('request', request);

		pwcn = require('../../lib/client');

	});

	afterEach(function () {
		mockery.disable();
	});

	it('should be a function', function () {
		assert.isFunction(pwcn);
	});

	it('should return an object', function () {
		assert.isObject(pwcn());
	});

	describe('[returned object]', function () {
		var client;

		beforeEach(function () {
			client = pwcn('http://pa11y-ws/');
		});

		it('should have a tasks property (object)', function () {
			assert.isObject(client.tasks);
		});

		it('should have a task method', function () {
			assert.isFunction(client.task);
		});

		describe('.tasks', function () {

			it('should have a create method', function () {
				assert.isFunction(client.tasks.create);
			});

			it('should have a get method', function () {
				assert.isFunction(client.tasks.get);
			});

			it('should have a results method', function () {
				assert.isFunction(client.tasks.results);
			});

			describe('.create()', function () {

				it('should create a task in the web-service', function (done) {
					client.tasks.create({
						url: 'nature.com',
						standard: 'WCAG2AA'
					}, function (err) {
						assert.isNull(err);
						done();
					});
				});

				it('should callback with the new task', function (done) {
					client.tasks.create({
						url: 'nature.com',
						standard: 'WCAG2AA'
					}, function (err, task) {
						assert.isObject(task);
						assert.isDefined(task.id);
						assert.strictEqual(task.url, 'nature.com');
						assert.strictEqual(task.standard, 'WCAG2AA');
						done();
					});
				});

				it('should callback with an error if the task was not created', function (done) {
					client.tasks.create({}, function (err) {
						assert.isInstanceOf(err, Error);
						assert.strictEqual(err.message, 'foo');
						done();
					});
				});

			});

			describe('.get()', function () {

				it('should get all tasks from the web-service', function (done) {
					client.tasks.get({}, function (err) {
						assert.isNull(err);
						done();
					});
				});

				it('should use the passed in query string if present', function (done) {
					var query = {
						lastres: true
					};
					client.tasks.get(query, function () {
						assert.deepEqual(request.getCall(0).args[0].qs, query);
						done();
					});
				});

				it('should callback with the recieved tasks', function (done) {
					client.tasks.get({}, function (err, tasks) {
						assert.isArray(tasks);
						done();
					});
				});

			});

			describe('.results()', function () {

				it('should get all results from the web-service', function (done) {
					client.tasks.results({}, function (err) {
						assert.isNull(err);
						done();
					});
				});

				it('should use the passed in query string if present', function (done) {
					var query = {
						from: 'foo',
						to: 'bar',
						full: true
					};
					client.tasks.results(query, function () {
						assert.deepEqual(request.getCall(0).args[0].qs, query);
						done();
					});
				});

				it('should callback with the recieved results', function (done) {
					client.tasks.results({}, function (err, results) {
						assert.isArray(results);
						done();
					});
				});

				it('should callback with an error if the query is invalid', function (done) {
					client.tasks.results({foo: 'bar'}, function (err) {
						assert.isInstanceOf(err, Error);
						assert.strictEqual(err.message, 'foo');
						done();
					});
				});

			});

		});

		describe('.task()', function () {

			it('should return an object', function () {
				assert.isObject(client.task());
			});

			describe('[returned object]', function () {

				it('should have a get method', function () {
					assert.isFunction(client.task().get);
				});

				it('should have a remove method', function () {
					assert.isFunction(client.task().remove);
				});

				it('should have a run method', function () {
					assert.isFunction(client.task().run);
				});

				it('should have a results method', function () {
					assert.isFunction(client.task().results);
				});

				it('should have a result method', function () {
					assert.isFunction(client.task().result);
				});

				describe('.get()', function () {

					it('should get the task from the web-service', function (done) {
						client.task('task1').get({}, function (err) {
							assert.isNull(err);
							done();
						});
					});

					it('should use the passed in query string if present', function (done) {
						var query = {
							lastres: true
						};
						client.task('task1').get(query, function () {
							assert.deepEqual(request.getCall(0).args[0].qs, query);
							done();
						});
					});

					it('should callback with the recieved task', function (done) {
						client.task('task1').get({}, function (err, task) {
							assert.isObject(task);
							assert.isDefined(task.id);
							done();
						});
					});

					it('should callback with an error if the task was not found', function (done) {
						client.task('task2').get({}, function (err) {
							assert.isInstanceOf(err, Error);
							assert.strictEqual(err.message, 'foo');
							done();
						});
					});

				});

				describe('.remove()', function () {

					it('should delete the task in the web-service', function (done) {
						client.task('task1').remove(function (err) {
							assert.isNull(err);
							done();
						});
					});

					it('should callback with an error if the task was not found', function (done) {
						client.task('task2').remove(function (err) {
							assert.isInstanceOf(err, Error);
							assert.strictEqual(err.message, 'foo');
							done();
						});
					});

				});

				describe('.run()', function () {

					it('should run the task in the web-service', function (done) {
						client.task('task1').run(function (err) {
							assert.isNull(err);
							done();
						});
					});

				});

				describe('.results()', function () {

					it('should get the task\'s results from the web-service', function (done) {
						client.task('task1').results({}, function (err) {
							assert.isNull(err);
							done();
						});
					});

					it('should use the passed in query string if present', function (done) {
						var query = {
							from: 'foo',
							to: 'bar',
							full: true
						};
						client.task('task1').results(query, function () {
							assert.deepEqual(request.getCall(0).args[0].qs, query);
							done();
						});
					});

					it('should callback with the recieved results', function (done) {
						client.task('task1').results({}, function (err, results) {
							assert.isArray(results);
							done();
						});
					});

					it('should callback with an error if the query is invalid', function (done) {
						client.task('task1').results({foo: 'bar'}, function (err) {
							assert.isInstanceOf(err, Error);
							assert.strictEqual(err.message, 'foo');
							done();
						});
					});

					it('should callback with an error if the task was not found', function (done) {
						client.task('task2').results({}, function (err) {
							assert.isInstanceOf(err, Error);
							assert.strictEqual(err.message, 'foo');
							done();
						});
					});

				});

				describe('.result()', function () {

					it('should return an object', function () {
						assert.isObject(client.task().result());
					});

					describe('[returned object]', function () {

						it('should have a get method', function () {
							assert.isFunction(client.task().get);
						});

						describe('.get()', function () {

							it('should get the result from the web-service', function (done) {
								client.task('task1').result('result1').get({}, function (err) {
									assert.isNull(err);
									done();
								});
							});

							it('should use the passed in query string if present', function (done) {
								var query = {
									full: true
								};
								client.task('task1').result('result1').get(query, function () {
									assert.deepEqual(request.getCall(0).args[0].qs, query);
									done();
								});
							});

							it('should callback with the recieved result', function (done) {
								client.task('task1').result('result1').get({}, function (err, result) {
									assert.isObject(result);
									assert.isDefined(result.id);
									done();
								});
							});

							it('should callback with an error if the result was not found', function (done) {
								client.task('task1').result('result2').get({}, function (err) {
									assert.isInstanceOf(err, Error);
									assert.strictEqual(err.message, 'foo');
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
