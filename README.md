
Pa11y Webservice Node.js Client
===============================

This is a Node.js client library for [Pa11y Webservice][pa11y-webservice].

**Current Version:** *1.2.1*  
**Build Status:** [![Build Status][travis-img]][travis]  
**Node Version Support:** *0.10–6*


Installing
----------

Install Pa11y Webservice Node.js Client with npm:

```sh
$ npm install pa11y-webservice-client-node
```


Usage
-----

For more information on the actual webservice endpoints and resource types, [read the documentation][wiki-web-service].

```js
var createClient = require('pa11y-webservice-client-node');

// Create client with the base URL of the web-service
var client = createClient('http://localhost:3000/');

// Create a task
client.tasks.create({
    name: 'Nature Home Page',
    url: 'nature.com',
    standard: 'WCAG2AA'
}, function (err, task) {
    // task  =  object representing the new task, or null if an error occurred
});

// Get all tasks
client.tasks.get({}, function (err, tasks) {
    // tasks  =  array of objects representing tasks, or null if an error occurred
});

// Get all tasks with last results included for each
client.tasks.get({
    lastres: true
}, function (err, tasks) {
    // tasks  =  array of objects representing tasks, or null if an error occurred
});

// Get results for all tasks
client.tasks.results({}, function (err, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for all tasks within a date range
client.tasks.results({
    from: '2013-01-01',
    to: '2013-01-31'
}, function (err, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for all tasks with full details
client.tasks.results({
    full: true
}, function (err, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get a task by ID
client.task('5231c687bbdf0f94fa000007').get({}, function (err, task) {
    // task  =  object representing the requested task, or null if an error occurred
});

// Get a task by ID with last results included
client.task('5231c687bbdf0f94fa000007').get({
    lastres: true
}, function (err, task) {
    // task  =  object representing the requested task, or null if an error occurred
});

// Edit a task by ID
client.task('5231c687bbdf0f94fa000007').edit({
    name: 'New name'
}, function (err, task) {
    // task  =  object representing the newly updated task, or null if an error occurred
});

// Delete a task by ID
client.task('5231c687bbdf0f94fa000007').remove(function (err) {
    // err  =  null if task was deleted, or an Error object if something went wrong
});

// Run a task by ID
client.task('5231c687bbdf0f94fa000007').run(function (err) {
    // err  =  null if task is running, or an Error object if something went wrong
});

// Get results for a task
client.task('5231c687bbdf0f94fa000007').results({}, function (err, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for a task within a date range
client.task('5231c687bbdf0f94fa000007').results({
    from: '2013-01-01',
    to: '2013-01-31'
}, function (err, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for a task with full details
client.task('5231c687bbdf0f94fa000007').results({
    full: true
}, function (err, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get a result by ID
client.task('5231c687bbdf0f94fa000007').result('523c0ee0ca452f0000000009').get({}, function (err, result) {
    // task  =  object representing the requested result, or null if an error occurred
});

// Get a result by ID with full details
client.task('5231c687bbdf0f94fa000007').result('523c0ee0ca452f0000000009').get({
    full: true
}, function (err, result) {
    // task  =  object representing the requested result, or null if an error occurred
});
```


Contributing
------------

There are many ways to contribute to Pa11y Webservice Node.js Client, we cover these in the [contributing guide](CONTRIBUTING.md) for this repo.

If you're ready to contribute some code, you'll need to clone the repo locally and run `npm install`. You'll also need [Grunt][grunt] to be installed globally in order to run tests, you can do this with `npm install -g grunt-cli`.

Now you'll be able to run the following commands:

```sh
$ grunt       # Run the lint and test tasks together
$ grunt lint  # Run JSHint with the correct config
$ grunt test  # Run unit tests
```

Code with lint errors or failing tests will not be accepted, please use the build tools outlined above.

For users with push-access, don't commit to the master branch. Code should be in `develop` until it's ready to be released.


License
-------

Licensed under the [GNU General Public License 3.0](LICENSE.txt).<br/>
Copyright &copy; 2013–2017, Team Pa11y



[gpl]: http://www.gnu.org/licenses/gpl-3.0.html
[grunt]: http://gruntjs.com/
[pa11y-webservice]: https://github.com/pa11y/webservice
[travis]: https://travis-ci.org/pa11y/webservice-client-node
[travis-img]: https://travis-ci.org/pa11y/webservice-client-node.png?branch=master
[wiki-web-service]: https://github.com/pa11y/webservice/wiki/Web-Service-Endpoints
