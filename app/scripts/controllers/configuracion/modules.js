'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.configuracion',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.configuracion.permisos',
				data: {
					pageTitle: 'SAC | PERMISOS',
					permissions: {
						only: ['permisosSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/configuracion/permisos',
				templateUrl: 'views/configuracion/permisos.html',
				controller: 'PermisosCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.configuracion.roles',
				data: {
					pageTitle: 'SAC | ROLES',
					permissions: {
						only: ['rolesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/configuracion/roles',
				templateUrl: 'views/configuracion/roles.html',
				controller: 'RolCtrl',
				controllerAs: '$ctrl'
			}
		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
