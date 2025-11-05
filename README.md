# Pa11y Webservice Node.js Client

This is a Node.js client library for [Pa11y Webservice][pa11y-webservice].

[![Latest version published to npm][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Supports pa11y-webservice@4 API][shield-api]][pa11y-webservice]
[![Build status][shield-build]][info-build]
[![LGPL-3.0 licensed][shield-license]][info-license]

## Installing

Add this client to your project with your preferred package manager. For example, to install it as a development dependency with npm:

```sh
npm install --save-dev pa11y-webservice-client-node
```

## Usage

For information about Pa11y Webservice's endpoints and resource types, [read the documentation][wiki-web-service].

### Creating a client

```js
const createClient = require('pa11y-webservice-client-node');

// Create client with the base URL of your instance of Pa11y Webservice
const client = createClient('http://localhost:3000/');
```

### Create a task

```js
client.tasks.create({
    name: 'Nature Home Page',
    url: 'nature.com',
    standard: 'WCAG2AA'
}, function (error, task) {
    // task: object if created; null if error occurred
});
```

### Fetch details about tasks

```js
// Get all tasks
client.tasks.get({}, function (error, tasks) {
    // tasks: array of task objects; null if error
});
```

```js
// Get all tasks, including most recent results for each
client.tasks.get({ lastres: true }, function (error, tasks) {
    // tasks: array of task object; null if error
});
```

```js
// Get a single task
client.task(taskId).get({}, function (error, task) {
    // task: object; null if error
});
```

```js
// Get a single task, including its most recent results
client.task(taskId).get({ lastres: true }, function (error, task) {
    // task: object; null if error
});
```

### Fetching tasks' results

```js
// Get results for all tasks
client.tasks.results({}, (error, results) => {
    // results: array of result objects; null if error
});
```

```js
// Get results for all tasks within a date range
const options = {
    from: '2023-01-01',
    to: '2023-01-31'
};

client.tasks.results(options, (error, results) => {
    // results: array of result objects; null if error
});
```

```js
// Get results for all tasks with full details
const options = {
    full: true
};

client.tasks.results(options, (error, results) => {
    // results: array of result objects; null if error
});
```

```js
// Get results for a task within a date range
client.task('5231c687bbdf0f94fa000007').results({
    from: '2023-01-01',
    to: '2023-01-31'
}, function (error, results) {
    // results: array of result objects; null if error
});
```

```js
// Get results for a task with full details
client.task(taskId).results({
    full: true
}, function (error, results) {
    // results: array of result objects; null if error
});
```

```js
// Get one result
client.task(taskId).result(resultId).get({}, (error, result) => {
    // result: object; null if error
});
```

```js
// Get one result with full details
const options = {
    full: true
};

client.task(taskId).result(resultId).get(options, (error, result) => {
    // result: object; null if error
});
```

```js
// Get results for a task
client.task(taskId).results({}, function (error, results) {
    // results  =  array of objects representing results, or null if an error occurred
});
```

### Edit a task

```js
client.task('5231c687bbdf0f94fa000007').edit({
    name: 'New name'
}, function (error, task) {
    // task  =  object representing the newly updated task, or null if an error occurred
});
```

### Remove a task

```js
client.task(taskId).remove(function (error) {
    // error: null if task deleted; Error object if error
});
```

### Run a task

```js
client.task(taskId).run(function (error) {
    // error: null if task is now running; Error object if error
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
# Run the testing workflow, with Node.js 24 only
act push --matrix node-version:24
```

Add `--verbose` for more output.

## Support and Migration

> [!TIP]
> We maintain a [migration guide](MIGRATION.md) to help you migrate between major versions.

When we release a new major version we will continue to support the previous major version for 6 months. This support will be limited to fixes for critical bugs and security issues. If you're opening an issue related to this project, please mention the specific version that the issue affects.

The following table lists the major versions available and, for each previous major version, its end-of-support date, and its final minor version released.

| Major version   | Final minor version | Node.js support          | Support end date |
| :-------------- | :------------------ | :----------------------- | :--------------- |
| `5`             |                     | `20`, `22`, `24`         | ✅ Current major version |
| `4`             | `4.0`               | `18`, `20`               | May 2026 |
| `3`             | `3.0`               | `12`, `14`, `16`         | September 2024   |
| `2`             | `2.0`               | `8`, `10`                | 2022-05-26       |
| `1`             | `1.2`               | `0.10`, `0.12`, `4`, `6` | 2020-01-05       |

## License

Licensed under the [Lesser General Public License (LGPL-3.0-only)][info-license].  
Copyright &copy; 2013-2025, Team Pa11y

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
[shield-api]: https://img.shields.io/badge/api-pa11y--webservice@4-blue.svg
