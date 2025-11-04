/*
 * Copyright (c) 2024 Pa11y project's team and contributors
 * SPDX-License-Identifier: LGPL-3.0-only
 */
'use strict';

function client(root) {
	return {
		tasks: {
			create(task, done) {
				post(`${root}tasks`, task, done);
			},
			get(query, done) {
				get(`${root}tasks`, query, done);
			},
			results(query, done) {
				get(`${root}tasks/results`, query, done);
			}
		},
		task(id) {
			return {
				get(query, done) {
					get(`${root}tasks/${id}`, query, done);
				},
				edit(edits, done) {
					patch(`${root}tasks/${id}`, edits, done);
				},
				remove(done) {
					del(`${root}tasks/${id}`, null, done);
				},
				run(done) {
					post(`${root}tasks/${id}/run`, null, done);
				},
				results(query, done) {
					get(`${root}tasks/${id}/results`, query, done);
				},
				result(rid) {
					return {
						get(query, done) {
							get(`${root}tasks/${id}/results/${rid}`, query, done);
						}
					};
				}
			};
		}
	};
}

function del(url, query, done) {
	call({
		method: 'DELETE',
		url,
		query
	}, done);
}

function get(url, query, done) {
	call({
		method: 'GET',
		url,
		query
	}, done);
}

function patch(url, body, done) {
	call({
		method: 'PATCH',
		url,
		body
	}, done);
}

function post(url, body, done) {
	call({
		method: 'POST',
		url,
		body
	}, done);
}

function buildUrl(url, query) {
	const fullUrl = new URL(url);
	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			fullUrl.searchParams.append(key, value);
		});
	}
	return fullUrl.toString();
}

function buildFetchOptions(method, body) {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json'
		}
	};
	if (body) {
		options.body = JSON.stringify(body);
	}
	return options;
}

async function parseResponseBody(response) {
	const contentType = response.headers.get('content-type');
	if (contentType && contentType.includes('application/json')) {
		return response.json();
	}
	const text = await response.text();
	return text || null;
}

async function call({method, url, query, body}, done) {
	try {
		const fullUrl = buildUrl(url, query);
		const options = buildFetchOptions(method, body);
		const response = await fetch(fullUrl, options);
		const responseBody = await parseResponseBody(response);

		if (response.status >= 300) {
			const message = (responseBody?.message || `Error ${response.status}`);
			return done(new Error(message));
		}

		done(null, responseBody);
	} catch (error) {
		done(error);
	}
}

module.exports = client;
