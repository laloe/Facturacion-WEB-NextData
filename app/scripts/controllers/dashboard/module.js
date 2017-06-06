'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.dashboard',
				data: {
					pageTitle: 'SAC | DASHBOARD',
					permissions: {
						ecxept: ['anonymous'],
						options: {
							reload: false
						}
					}
				},
				url: '/dashboard',
				templateUrl: 'views/dashboard.html',
				controller: 'dashboardCtrl',
				controllerAs: '$ctrl'
			}

		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
