'use strict';

//Jobs service used for communicating with the jobs REST endpoints
angular.module('jobs').factory('Jobs', ['$resource',
	function($resource) {
		return $resource('jobs/:jobId', {
			jobId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);