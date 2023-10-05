# Pa11y Webservice Node.js Client

This is a Node.js client library for [Pa11y Webservice][pa11y-webservice].

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![LGPL-3.0 licensed][shield-license]][info-license]

## Installing

Add this client to your project with your preferred package manager. For example, to install it as a development dependency with npm:

```sh
npm install --save-dev pa11y-webservice-client-node
```

## Usage

For information about Pa11y Webservice's endpoints and resource types, [read the documentation][wiki-web-service].

```js
const createClient = require('pa11y-webservice-client-node');

// Create client with the base URL of your instance of Pa11y Webservice
const client = createClient('http://localhost:3000/');

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
    from: '2023-01-01',
    to: '2023-01-31'
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
    from: '2023-01-01',
    to: '2023-01-31'
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

## Contributing

There are many ways to contribute to Pa11y Webservice Node.js Client; we cover these in this repo's [contributing guide](CONTRIBUTING.md).

If you'd like to contribute code, get started by cloning the repo and running `npm install`. Now you'll be able to run the following commands. Please use these build tools to avoid your contribution being delayed by a lint error or a failing test:

```sh
# Lint your contribution
grunt lint
```

```sh
# Test your contribution
grunt test
```

```sh
# Lint and test with a single command
grunt
```

## Support and Migration

Major versions are normally supported for 6 months after their last minor release. This means that patch-level changes will be added and bugs will be fixed. The table below outlines the end-of-support dates for major versions, and the last minor release for that version.

We also maintain a [migration guide](MIGRATION.md) to help you migrate.

| :grey_question: | Major Version | Last Release | Node.js Versions | Support End Date |
| :-------------- | :------------ | :----------- | :--------------- | :--------------- |
| :heart:         | 3             | N/A          | 12+              | N/A              |
| :hourglass:     | 2             | 2.0.0        | 8+               | 2022-05-26       |
| :skull:         | 1             | 1.2.1        | 0.10+            | 2020-01-05       |

If you're opening issues related to these, please mention the version that the issue relates to.

## License

Licensed under the [GNU General Public License 3.0](LICENSE.txt).<br/>
Copyright &copy; 2013–2023, Team Pa11y

[gpl]: http://www.gnu.org/licenses/gpl-3.0.html
[grunt]: http://gruntjs.com/
[pa11y-webservice]: https://github.com/pa11y/pa11y-webservice
[wiki-web-service]: https://github.com/pa11y/pa11y-webservice/wiki/Web-Service-Endpoints
[info-build]: https://github.com/pa11y/pa11y-webservice-client-node/actions/workflows/build-and-test.yml
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/pa11y-webservice-client-node
[shield-build]: https://github.com/pa11y/pa11y-webservice-client-node/actions/workflows/build-and-test.yml/badge.svg
[shield-license]: https://img.shields.io/badge/license-LGPL%203.0-blue.svg
[shield-node]: https://img.shields.io/node/v/pa11y-webservice-client-node.svg
[shield-npm]: https://img.shields.io/npm/v/pa11y-webservice-client-node.svg
