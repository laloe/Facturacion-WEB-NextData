'use strict';
angular
	.module('softvApp')
	.factory('desgloseFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			checarDesglose: '/uspChecaSiTieneDesglose/GetDeepuspChecaSiTieneDesglose',
			busquedaDesglose: '/BuscaDesgloseDeMoneda/GetBuscaDesgloseDeMonedaList',
			agregarDesglose: '/DesgloseDeMoneda/GetDesgloseDeMonedaList',
			consultaDesglose: '/DesgloseDeMoneda/GetDeepDesgloseDeMoneda',
			updateDesglose: '/DesgloseDeMoneda/UpdateDesgloseDeMoneda',
			deleteDesglose: '/DesgloseDeMoneda/DeleteDesgloseDeMoneda',
			validarCajero: '/ValidacionLoginCajera/GetDeepValidacionLoginCajera',
			printDesglose: '/DesgloseDeMoneda/GetReporteDesgloseMoneda'
		};

		factory.printDesglose = function(consecutivo) {
			var deferred = $q.defer();
			var Parametros = {
				'Consecutivo': consecutivo
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.printDesglose, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.checarDesglose = function(usuario, fecha) {
			var deferred = $q.defer();
			var Parametros = {
				'id': 0,
				'Fecha': fecha,
				'ClvUsuario': usuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.checarDesglose, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.busquedaDesglose = function(seleccion, usuario, fecha) {
			var deferred = $q.defer();
			var Parametros = {
				'Op': seleccion,
				'ClvUsuario': usuario,
				'Fecha': fecha
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.busquedaDesglose, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.agregarDesglose = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.usuario;
			var Parametros = {
				'Cajera': user,
				'B1000': obj.B1000,
				'B500': obj.B500,
				'B200': obj.B200,
				'B100': obj.B100,
				'B50': obj.B50,
				'B20': obj.B20,
				'M100': obj.M100,
				'M50': obj.M50,
				'M20': obj.M20,
				'M10': obj.M10,
				'M5': obj.M5,
				'M2': obj.M2,
				'M1': obj.M1,
				'M050': obj.M050,
				'M020': obj.M020,
				'M010': obj.M010,
				'M005': obj.M005,
				'Cheques': obj.Cheques,
				'Tarjeta': obj.Tarjeta,
				'Total': obj.Total,
				'Referencia': obj.Referencia,
				'Gastos': obj.Gastos,
				'SaldoAnterior': obj.SaldoAnterior,
				'ImporteDolar': obj.ImporteDolar,
				'TipoCambio': obj.TipoCambio,
				'TotalDolar': obj.TotalDolar
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.agregarDesglose, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.consultaDesglose = function(consecutivo) {
			var deferred = $q.defer();
			var Parametros = {
				'Consecutivo': consecutivo
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.consultaDesglose, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.updateDesglose = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.usuario;
			var Parametros = {
				'objDesgloseDeMoneda': {
					'Cajera': user,
					'B1000': obj.B1000,
					'B500': obj.B500,
					'B200': obj.B200,
					'B100': obj.B100,
					'B50': obj.B50,
					'B20': obj.B20,
					'M100': obj.M100,
					'M50': obj.M50,
					'M20': obj.M20,
					'M10': obj.M10,
					'M5': obj.M5,
					'M2': obj.M2,
					'M1': obj.M1,
					'M050': obj.M050,
					'M020': obj.M020,
					'M010': obj.M010,
					'M005': obj.M005,
					'Cheques': obj.Cheques,
					'Tarjeta': obj.Tarjeta,
					'Total': obj.Total,
					'Referencia': obj.Referencia,
					'Gastos': obj.Gastos,
					'ImporteDolar': obj.ImporteDolar,
					'SaldoAnterior': obj.SaldoAnterior,
					'TipoCambio': obj.TipoCambio,
					'TotalDolar': obj.TotalDolar,
					'Consecutivo': obj.Consecutivo
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.updateDesglose, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.deleteDesglose = function(consecutivo) {
			var deferred = $q.defer();
			var Parametros = {
				'Consecutivo': consecutivo
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.deleteDesglose, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.validarCajero = function(clave, user, pass) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvUsuario': clave,
				'Usuario': user,
				'Pass': pass,
				'Id': 0
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.validarCajero, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		return factory;
	});
