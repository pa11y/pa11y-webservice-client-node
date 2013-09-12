/* global describe, it */
'use strict';

var assert = require('proclaim');
var pwcn = require('../../lib/client');

describe('pa11y-webservice-client-node', function () {

	it('should be a function', function () {
		assert.isFunction(pwcn);
	});

	it('should return an object', function () {
		assert.isObject(pwcn());
	});

	describe('[returned object]', function () {

		it('should have a tasks property (object)', function () {
			assert.isObject(pwcn().tasks);
		});

		it('should have a task method', function () {
			assert.isFunction(pwcn().task);
		});

		describe('.tasks', function () {

			it('should have a create method', function () {
				assert.isFunction(pwcn().tasks.create);
			});

			it('should have a get method', function () {
				assert.isFunction(pwcn().tasks.get);
			});

			it('should have a results method', function () {
				assert.isFunction(pwcn().tasks.results);
			});

			describe('.create()', function () {

				it('should create a task in the web-service');
				it('should callback with the new task');

			});

			describe('.get()', function () {

				it('should get all tasks from the web-service');
				it('should callback with the recieved tasks');

			});

			describe('.results()', function () {

				it('should get all results from the web-service');
				it('should use the passed in query string if present');
				it('should callback with the recieved results');

			});

		});

		describe('.task()', function () {

			it('should return an object', function () {
				assert.isObject(pwcn().task());
			});

			describe('[returned object]', function () {

				it('should have a get method', function () {
					assert.isFunction(pwcn().task().get);
				});

				it('should have a remove method', function () {
					assert.isFunction(pwcn().task().remove);
				});

				it('should have a results method', function () {
					assert.isFunction(pwcn().task().results);
				});

				describe('.get()', function () {

					it('should get the task from the web-service');
					it('should callback with the recieved task');

				});

				describe('.remove()', function () {

					it('should delete the task in the web-service');

				});

				describe('.results()', function () {

					it('should get the task\'s results from the web-service');
					it('should use the passed in query string if present');
					it('should callback with the recieved results');

				});

			});

		});

	});

});
