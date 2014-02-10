// This file is part of pa11y-webservice-client-node.
// 
// pa11y-webservice-client-node is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// pa11y-webservice-client-node is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with pa11y-webservice-client-node.  If not, see <http://www.gnu.org/licenses/>.

module.exports = function (grunt) {

	grunt.initConfig({

		jshint: {
			all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
			options: {
				es3: false,
				indent: 4,
				latedef: false,
				maxcomplexity: 4,
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
	grunt.registerTask('ci', ['lint', 'test']);

};