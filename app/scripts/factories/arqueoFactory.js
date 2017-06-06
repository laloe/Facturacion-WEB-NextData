'use strict';
angular
	.module('softvApp')
	.factory('arqueoFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getCajeros: '/MuestraCajerosProcesos/GetMuestraCajerosArqueoList',
			reporteArqueo: '/T1RepArqueo/GetT1RepArqueoList'
		};


		factory.getCajeros = function(plaza) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'IdUsuario': user,
				'IdPlaza': plaza
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getCajeros, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.reporteArqueo = function(fecha, usuario) {
			var deferred = $q.defer();
			var Parametros = {
				'Fecha': fecha,
				'ClvUsuario': usuario,
				'Id': 0
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reporteArqueo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		return factory;
	});
