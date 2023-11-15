# Pa11y Webservice Node.js Client

This is a Node.js client library for [Pa11y Webservice][pa11y-webservice].

[![Latest version published to npm][shield-npm]][info-npm]
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
}, function (error, task) {
    // task  =  object representing the new task, or null if an error occurred
});

// Get all tasks
client.tasks.get({}, function (error, tasks) {
    // tasks  =  array of objects representing tasks, or null if an error occurred
});

// Get all tasks with last results included for each
client.tasks.get({
    lastres: true
}, function (error, tasks) {
    // tasks  =  array of objects representing tasks, or null if an error occurred
});

// Get results for all tasks
client.tasks.results({}, function (error, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for all tasks within a date range
client.tasks.results({
    from: '2023-01-01',
    to: '2023-01-31'
}, function (error, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for all tasks with full details
client.tasks.results({
    full: true
}, function (error, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get a task by ID
client.task('5231c687bbdf0f94fa000007').get({}, function (error, task) {
    // task  =  object representing the requested task, or null if an error occurred
});

// Get a task by ID with last results included
client.task('5231c687bbdf0f94fa000007').get({
    lastres: true
}, function (error, task) {
    // task  =  object representing the requested task, or null if an error occurred
});

// Edit a task by ID
client.task('5231c687bbdf0f94fa000007').edit({
    name: 'New name'
}, function (error, task) {
    // task  =  object representing the newly updated task, or null if an error occurred
});

// Delete a task by ID
client.task('5231c687bbdf0f94fa000007').remove(function (error) {
    // err  =  null if task was deleted, or an Error object if something went wrong
});

// Run a task by ID
client.task('5231c687bbdf0f94fa000007').run(function (error) {
    // err  =  null if task is running, or an Error object if something went wrong
});

// Get results for a task
client.task('5231c687bbdf0f94fa000007').results({}, function (error, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for a task within a date range
client.task('5231c687bbdf0f94fa000007').results({
    from: '2023-01-01',
    to: '2023-01-31'
}, function (error, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get results for a task with full details
client.task('5231c687bbdf0f94fa000007').results({
    full: true
}, function (error, results) {
    // results  =  array of objects representing results, or null if an error occurred
});

// Get a result by ID
client.task('5231c687bbdf0f94fa000007').result('523c0ee0ca452f0000000009').get({}, function (error, result) {
    // task  =  object representing the requested result, or null if an error occurred
});

// Get a result by ID with full details
client.task('5231c687bbdf0f94fa000007').result('523c0ee0ca452f0000000009').get({
    full: true
}, function (error, result) {
    // task  =  object representing the requested result, or null if an error occurred
});
```

## Contributing

There are many ways to contribute to Pa11y Webservice Node.js Client; we cover these in this repo's [contributing guide](CONTRIBUTING.md).

If you'd like to contribute code, get started by cloning the repo and running `npm install`. Now you'll be able to run the following commands. Please use these build tools to avoid your contribution being delayed by a lint error or a failing test:

```sh
# Lint your contribution
npm run lint
```

```sh
# Test your contribution
npm test
```

### Testing the GitHub Actions workflows

This project's GitHub Actions workflows can be tested locally using [nektos/act](https://github.com/nektos/act), which can be installed with Homebrew:

```sh
brew install act
```

To validate the syntax of a workflow:

```sh
# Validate the publishing workflow, by triggering a 'release' event
act --dryrun release
```

```sh
# Validate the testing workflow
act --dryrun push
```

To run the testing workflow locally:

```sh
# Run the testing workflow, with Node.js 18 only
act push --matrix node-version:18
```

Add `--verbose` for more output.

## Support and Migration

> [!NOTE]
> We maintain a [migration guide](MIGRATION.md) to help you migrate between major versions.

When we release a new major version we will continue to support the previous major version for 6 months. This support will be limited to fixes for critical bugs and security issues. If you're opening an issue related to this project, please mention the specific version that the issue affects.

The following table lists the major versions available and, for each previous major version, its end-of-support date, and its final minor version released.

| Major version   | Final minor version | Node.js support          | Support end date |
| :-------------- | :------------------ | :----------------------- | :--------------- |
| `3`             |                     | `>= 12`                  | ✅ Current major version |
| `2`             | `2.0`               | `8`, `10`                | 2022-05-26       |
| `1`             | `1.2`               | `0.10`, `0.12`, `4`, `6` | 2020-01-05       |

## License

Licensed under the [GNU General Public License 3.0][info-license].  
Copyright &copy; 2013-2023, Team Pa11y

[gpl]: http://www.gnu.org/licenses/gpl-3.0.html
[pa11y-webservice]: https://github.com/pa11y/pa11y-webservice
[wiki-web-service]: https://github.com/pa11y/pa11y-webservice/wiki/Web-Service-Endpoints
[info-build]: https://github.com/pa11y/pa11y-webservice-client-node/actions/workflows/tests.yml
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/pa11y-webservice-client-node
[shield-build]: https://github.com/pa11y/pa11y-webservice-client-node/actions/workflows/tests.yml/badge.svg
[shield-license]: https://img.shields.io/badge/license-LGPL%203.0-blue.svg
[shield-node]: https://img.shields.io/node/v/pa11y-webservice-client-node.svg
[shield-npm]: https://img.shields.io/npm/v/pa11y-webservice-client-node.svg
