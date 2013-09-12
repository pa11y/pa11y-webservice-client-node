/* global describe, it */
'use strict';

describe('pa11y-webservice-client-node', function () {

	it('should be a function');
	it('should return an object');

	describe('[returned object]', function () {

		it('should have a tasks property (object)');
		it('should have a task method');

		describe('.tasks', function () {

			it('should have a create method');
			it('should have a get method');
			it('should have a results method');

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

			it('should return an object');

			describe('[returned object]', function () {

				it('should have a get method');
				it('should have a remove method');
				it('should have a results method');

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
