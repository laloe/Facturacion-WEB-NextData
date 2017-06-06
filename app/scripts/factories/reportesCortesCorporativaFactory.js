'use strict';
angular.module('softvApp')
	.factory('reportesCortesCorporativaFactory', function ($http, $q, globalService, $localStorage) { //, sessionFactory) {
		var factory = {};
		var paths = {

			mostrarDistribuidorByUsuario: '/compania/GetDistribuidorByUsuario',
			mostrarSucursalByUsuario: '/ContratoMaestroFac/GetSucursalByUsuario',
			getXml: '/ContratoMaestroFac/GetCreateXmlBeforeReporteCorporativa',
			//----------- Reportes Resumen	
			ReporteGeneral: '/ContratoMaestroFac/GetReporte_General',
			ReporteGeneralDeVentas: '/ContratoMaestroFac/GetReporte_GeneralDeVentas',
			Reporte_ResIngresoSucursal: '/ContratoMaestroFac/GetReporte_ResumenIngresoSucursal'
		};


		factory.mostrarDistribuidorByUsuario = function (clv_usuario) {
			var deferred = $q.defer();
			var Parametros = {
				'clv_usuario': clv_usuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarDistribuidorByUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.mostrarSucursalByUsuario = function (clv_usuario) {
			var deferred = $q.defer();
			var Parametros = {
				'clv_usuario': clv_usuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarSucursalByUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.getXml = function (reporteSeleccionado, objPrincipal, Distribuidores, Sucursales) {

			var deferred = $q.defer();
			var Parametros = {
				'objPrincipal': objPrincipal,
				'distriArray': Distribuidores,
				'sucursalArray': Sucursales
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getXml, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.creaReporte = function (clv_usuario, reporteSeleccionado, OtrosFiltrosXml, distribuidoresXML, sucursalesXml) {
			var rutaServicio;			
			if (reporteSeleccionado === 1) {
				rutaServicio = paths.ReporteGeneral;
			}
			else if (reporteSeleccionado === 2 ) {				
				rutaServicio = paths.ReporteGeneralDeVentas;
			}
			else if (reporteSeleccionado === 3) {
				rutaServicio = paths.Reporte_ResIngresoSucursal;
			}

			var deferred = $q.defer();
			var Parametros = {
				'reportData': {
					//	'clv_usuario': clv_usuario, 
					'clv_reporte': reporteSeleccionado,
					'OtrosFiltrosXml': OtrosFiltrosXml,
					'distribuidoresXML': distribuidoresXML,
					'sucursalesXml': sucursalesXml
				}
			};

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + rutaServicio, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};



		return factory;
	});
