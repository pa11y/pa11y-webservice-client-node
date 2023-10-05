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

module.exports = function (grunt) {

	grunt.initConfig({

		jshint: {
			all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
			options: {
				esversion: 6,
				indent: 4,
				latedef: false,
				maxcomplexity: 5,
				maxdepth: 2,
				maxlen: 100,
				maxparams: 5,
				maxstatements: 8,
				node: true,
				quotmark: 'single'
			}
		},

		mochaTest: {
			unit: {
				src: ['test/unit/**/*.js'],
				options: {
					reporter: 'spec'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['lint', 'test']);

};