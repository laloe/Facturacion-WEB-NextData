'use strict';
angular
	.module('softvApp')
	.factory('reportesFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getOpcionsMenu: '/OpcionesCortesFacturas/GetOpcionesCortesFacturasList',
			getOptionsSubMenu: '/CatalogoReportesFac/GetCatalogoReportesFacList',
			getDistribuidores: '/DistribuidorReporte/GetDistribuidorReporteList',
			getPlazasByDistribuidor: '/PlazaReporte/GetPlazaDList',
			getCajas: '/Muestra_CajasCortes/GetMuestra_CajasCortesList',
			getSucursales: '/Muestra_SucursalesCortes/GetMuestra_SucursalesCortesList',
			getUsuarios: '/Muestra_UsuariosCortes/GetMuestra_UsuariosCortesList',
			getVendedores: '/Muestra_VendedoresCortes/GetMuestra_VendedoresCortesList',
			reporteGeneralCajas: '/ReporteCortesFac/GetReporteCortesFList',
			reportesPorCajero: '/ReporteCortesFac/GetReporteCortesCajeroList',
			reportesPorCaja: '/ReporteCortesFac/GetReporteCortesCajaList',
			reportesPorSucursal: '/ReporteCortesFac/GetReporteCortesSucursalList',
			reporteGeneralCajasFiscales: '/ReporteFacFis/GetReporteCortesGralFacFisList',
			reportesPorCajeroPuntos: '/ReporteCortesFac/GetReporteCortesCajeroConPuntosList',
			reportePorPlaza: '/ReportesCortesPlaza/GetReporteCortesPlazaCajasList',
			reportesPorSucursalFiscales: '/ReporteFacFis/GetReporteCortesSucFacFisList',
			reportesGeneralVentas: '/ReporteCortesFac/GetReporteCortesGralVentasList',
			reportesCajasVentas: '/ReporteCortesFac/GetReporteCortesCajasVentasList',
			reportesSucursalesVentas: '/ReporteCortesFac/GetReporteCortesSucursalVentasList',
			reportesCajeroVentas: '/ReporteCortesFac/GetReporteCortesCajeroVentasList',
			reportesPlazasVentas: '/ReportesCortesPlaza/GetReporteCortesPlazaVentasList',
			reportesCajeroPuntos: '/ReporteCortesFac/GetReporteCortesCajeroConPuntosVentasList',
			reportesGeneralFiscalesVentas: '/ReporteFacFis/GetReporteCortesGralFacFisVentasList',
			reportesPorSucursalFiscalesVentas: '/ReporteFacFis/GetReporteCortesSucFacFisVentasList',
			reportesPorVendedor: '/ReporteCortesFac/GetReporteCortesPorVendedorList',
			reportesGeneralResumen: '/ReporteCortesFac/GetReporteCortesGralResumenList',
			reportesCajeroResumen: '/ReporteCortesFac/GetReporteCortesCajeroResumenList',
			reporteSucursalesResumen: '/ReporteCortesFac/GetReporteCortesSucursalResumenList',
			reportesSucursalFisResumen: '/ReporteFacFis/GetReporteCortesSucFacFisResumenList',
			reportesCajeroPuntosResumen: '/ReporteCortesFac/GetReporteCortesCajeroConPuntosResumenList',
			reportesPlazaResumen: '/ReportesCortesPlaza/GetReporteCortesPlazaResumenList',
			//sucursales especiales
			muestraSucursalesEspeciales: '/SucursalesEspeciales/GetSucursalesEspecialesList',
			getOptionsEspeciales: '/OpcionesCortesFacturas/GetOpcionesCortesEspecialesFacList',
			getCatalogoOptionsEspeciales: '/CatalogoReportesFac/GetCatalogoRepCorteEspecialFacList',
			reporteGeneralEspeciales: '/ReporteCortesEspeciales/GetReporteCortesEspGralList',
			reporteSucursalEspeciales: '/ReporteCortesEspeciales/GetReporteCortesEspSucList',
			reporteFacturasFiscales: '/RepFacFisEspeciales/GetRepFacFisEspecialesGralList'
		};

		factory.getOpcionsMenu = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getOpcionsMenu, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getOptionsSubMenu = function(option) {
			var deferred = $q.defer();
			var Parametros = {
				'Op': option
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getOptionsSubMenu, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getDistribuidores = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'IdUsuario': user
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getDistribuidores, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getVendedores = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'IdUsuario': user
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getVendedores, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getPlazasByDistribuidor = function(objDist) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objDis': {
					'IdUsuario': user
				},
				'LstDis': objDist
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getPlazasByDistribuidor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getCajas = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'IdUsuario': user
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getCajas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getSucursales = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'IdUsuario': user
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getSucursales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getUsuarios = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'IdUsuario': user
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getUsuarios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reporteGeneralCajas = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reporteGeneralCajas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPorCajero = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Cajera': obj.cajera
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPorCajero, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPorCaja = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Caja': obj.caja
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPorCaja, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPorSucursal = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Sucursal': obj.sucursal
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPorSucursal, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reporteGeneralCajasFiscales = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reporteGeneralCajasFiscales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPorCajeroPuntos = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Cajera': obj.cajera
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPorCajeroPuntos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportePorPlaza = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportePorPlaza, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPorSucursalFiscales = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'Sucursal': obj.sucursal,
					'Resumen': obj.resumen,
					'IdUsuario': user
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPorSucursalFiscales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.reportesGeneralVentas = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesGeneralVentas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesCajasVentas = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Caja': obj.caja
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesCajasVentas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesSucursalesVentas = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Sucursal': obj.sucursal
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesSucursalesVentas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesCajeroVentas = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Cajera': obj.cajera
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesCajeroVentas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.reportesPlazasVentas = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPlazasVentas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesCajeroPuntos = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Cajera': obj.cajera
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesCajeroPuntos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesGeneralFiscalesVentas = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesGeneralFiscalesVentas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPorSucursalFiscalesVentas = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'Sucursal': obj.sucursal,
					'Resumen': obj.resumen,
					'IdUsuario': user
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPorSucursalFiscalesVentas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPorVendedor = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'Resumen': obj.resumen,
					'Vendedor': obj.vendedor
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPorVendedor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesGeneralResumen = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesGeneralResumen, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesCajeroResumen = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Cajera': obj.cajera
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesCajeroResumen, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reporteSucursalesResumen = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Sucursal': obj.sucursal
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reporteSucursalesResumen, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesSucursalFisResumen = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Sucursal': obj.sucursal,
					'IdUsuario': user,
					'Resumen': obj.resumen
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesSucursalFisResumen, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesCajeroPuntosResumen = function(obj) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen,
					'Cajera': obj.cajera
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesCajeroPuntosResumen, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.reportesPlazaResumen = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
				},
				'lstPlaza': obj.objPlaza,
				'lstDis': obj.objdistribuidores
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reportesPlazaResumen, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		//Sucursales especiales

		factory.muestraSucursalesEspeciales = function() {
			var deferred = $q.defer();
			var Parametros = {

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.muestraSucursalesEspeciales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getOptionsEspeciales = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getOptionsEspeciales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getCatalogoOptionsEspeciales = function(op) {
			var deferred = $q.defer();
			var Parametros = {
				'Op': op
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getCatalogoOptionsEspeciales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.reporteGeneralEspeciales = function(obj) {
			var user = $localStorage.currentUser.idUsuario;
			var deferred = $q.defer();
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user
				},
				'lstSuc': obj.objsucursales
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reporteGeneralEspeciales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.reporteSucursalEspeciales = function(obj) {
			var user = $localStorage.currentUser.idUsuario;
			var deferred = $q.defer();
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'Ordenar': obj.status,
					'IdUsuario': user,
					'Resumen': obj.resumen
				},
				'lstSuc': obj.objsucursales
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reporteSucursalEspeciales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.reporteFacturasFiscales = function(obj) {
			var user = $localStorage.currentUser.idUsuario;
			var deferred = $q.defer();
			var Parametros = {
				'objRep': {
					'Fi': obj.fechaInicial,
					'Ff': obj.fechaFinal,
					'IdUsuario': user
				},

				'lstSuc': obj.objsucursales
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.reporteFacturasFiscales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		return factory;
	});
