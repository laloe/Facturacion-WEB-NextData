'use strict';
angular.module('softvApp')
	.factory('authFactory', function($http, $q, $window, globalService, $localStorage, PermPermissionStore, $location) {
		var factory = {};
		var paths = {
			getAuthentication: '/DameSessionW/GetDameSessionWList'
		};

		factory.getAuthentication = function(token) {
			var deferred = $q.defer();
			var Parametros = {
				'Id': 0,
				'Codigo': token
			};
			var config = {
				headers: {
					'Authorization': token
				}
			};
			$http.post(globalService.getUrl() + paths.getAuthentication, JSON.stringify(Parametros), config).then(function(response) {
				console.log(response);
				if (response.data.GetDameSessionWListResult[0].Codigo) {
					$localStorage.currentUser = {
						token: response.data.GetDameSessionWListResult[0].Codigo,
						token1: token,
						usuario: response.data.GetDameSessionWListResult[0].Usuario,
						sucursal: response.data.GetDameSessionWListResult[0].IdSucursal,
						idUsuario: response.data.GetDameSessionWListResult[0].IdUsuario,
						maquina: response.data.GetDameSessionWListResult[0].IpMaquina,
						tipoUsuario: response.data.GetDameSessionWListResult[0].TipoUser,
						Menu: response.data.GetDameSessionWListResult[0].Menu
					};
					$window.location.reload();
				} else {
					$location.path('/auth/');
				}
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};


		return factory;
	});
