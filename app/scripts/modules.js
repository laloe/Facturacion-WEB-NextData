'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home',
				data: {
					pageTitle: 'BIENVENIDO | SAC WEB',
					permissions: {
						except: ['anonymous'],
						options: {
							reload: true
						}
					}
				},
				url: '/home',
				views: {
					'homeview': {
						templateUrl: 'views/main.html',
						controller: 'HomeCtrl',
						controllerAs: '$ctrl'
					}
				},
			},
			{
				name: 'auth',
				url: '/auth/?token',
				data: {
					pageTitle: 'BIENVENIDO | SAC WEB'
				},
				views: {
					'loginview': {
						templateUrl: 'views/login/login.html',
						controller: 'LoginCtrl',
						controllerAs: '$ctrl'
					}
				},
			}
		];

		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
