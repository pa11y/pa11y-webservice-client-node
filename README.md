
pa11y-webservice-client-node
============================

pa11y-webservice-client-node is a Node.js client library for [pa11y-webservice][pa11y-webservice].

**Current Version:** *1.0.0-beta.1*  
**Node Version Support:** *0.10*


Installing
----------

Install pa11y-webservice-client-node with npm:

```sh
$ npm install -g pa11y-webservice-client-node
```


Usage
-----

For more information on the actual web-service endpoints and resource types, [read the documentation][wiki-web-service].

```js
var createClient = require('pa11y-webservice-client-node');

// Create client with the base URL of the web-service
var client = createClient('http://localhost:3000/');

// Create a task
client.tasks.create({
    url: 'nature.com',
    standard: 'WCAG2AA'
}, function (err, task) {
    // task  =  object representing the new task, or null if an error occurred
});

// Get all tasks
client.tasks.get(function (err, tasks) {
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
client.task('5231c687bbdf0f94fa000007').get(function (err, task) {
    // task  =  object representing the requested task, or null if an error occurred
});

// Delete a task by ID
client.task('5231c687bbdf0f94fa000007').remove(function (err) {
    // err  =  null if task was deleted, or an Error object if something went wrong
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
```


Development
-----------

To develop pa11y-webservice-client-node, you'll need to clone the repo locally. Now you'll be able to run the following commands:

```sh
$ make lint  # Run JSHint with the correct config
$ make test  # Run tests
```

Code with lint errors or failing tests will not be accepted, please use the build tools outlined above.

For users with push-access, don't commit to the master branch. Code should be in `develop` until it's ready to be released.


License
-------

[Copyright 2013 Nature Publishing Group](LICENSE.txt).  
pa11y-webservice is licensed under the [GNU General Public License 3.0][gpl].



[gpl]: http://www.gnu.org/licenses/gpl-3.0.html
[pa11y-webservice]: https://github.com/nature/pa11y-webservice
[wiki-web-service]: https://github.com/nature/pa11y-webservice/wiki/Web-Service-Endpoints
