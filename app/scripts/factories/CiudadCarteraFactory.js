'use strict';
angular.module('softvApp')
	.factory('CiudadCarteraFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getTipoServicioList: '/VendedoresL/GetListTipServ',
			getFechaList: '/VendedoresL/GetListFechaCiudadCartera',
			getDetalleCartera: '/VendedoresL/GetListDetalleCartera'
		};

		factory.GetServicios = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTipoServicioList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};


		factory.GetFechas = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getFechaList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.GetDetalleCartera = function(servicio, fecha, TipoReporte) {
			var deferred = $q.defer();
			var DetalleCarteraEntity = {
				'Tipservicio': servicio,
				'Fecha': fecha,
				'TipoReporte': TipoReporte
			};

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.getDetalleCartera, JSON.stringify({
				'DetalleCartera': DetalleCarteraEntity
			}), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};


		return factory;
	});
