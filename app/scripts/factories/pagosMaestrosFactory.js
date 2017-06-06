'use strict';
angular
	.module('softvApp')
	.factory('pagosMaestrosFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			cobraSaldoMaestro: '/CobraContratoMaestro/GetCobraContratoMaestro',
			obtenEdoCuenta: '/ObtieneEdoCuentaSinSaldar/GetObtieneEdoCuentaSinSaldarList',
			grabaFactura: '/GuardaPagoFacturaMaestro/AddGuardaPagoFacturaMaestro',
			dimeSiYaGrabeFacMaestro: '/DimeSiYaGrabeUnaFacMaestro/GetDimeSiYaGrabeUnaFacMaestro',
			nuePagoEfectivoMaestro: '/NUEPago_En_EfectivoDetMaestro/AddNUEPago_En_EfectivoDetMaestro',
			nuePagoEfectivoPago: '/NUEPago_En_EfectivoDetPago/AddNUEPago_En_EfectivoDetPago',
			pagoGrabaFactura: '/GuardaPagoFacturaMaestro/GetGuardaPagoFacturaMaestro',
			getMedios: '/ObtieneMediosPago/GetObtieneMediosPagoList',
			actFactura: '/ActualizaFacturaMaestro/AddActualizaFacturaMaestro',
			obtenFacturas: '/ObtieneHistorialPagosFacturaMaestro/GetObtieneHistorialPagosFacturaMaestroList',
			dameDetalle: '/DetalleContratosMaestros/GetDetalleContratosMaestrosList',
			verFacturas: '/ContratoMaestroFac/GetFacturasPorCliDePago',
			buscarPagos: '/BuscaFacturasMaestroConsulta/GetBuscaFacturasMaestroConsultaList',
			generaFactura: '/GrabaFacturaCMaestro/GetGrabaFacturaCMaestro',
			dameDetalleFactura: '/DameDetalle_FacturaMaestro/GetDameDetalle_FacturaMaestroList',
			GetBuscaFacturasMaestroPendientesList: '/BuscaFacturasMaestroPendientes/GetBuscaFacturasMaestroPendientesList'
		};

		factory.cobraSaldoMaestro = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoMaestro':contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.cobraSaldoMaestro, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.obtenEdoCuenta = function(contrato,clave) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato':contrato,
				'ClvSession':clave
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.obtenEdoCuenta, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.grabaFactura = function(objPagar) {
			var deferred = $q.defer();
			var Parametros = {
				'objGuardaPagoFacturaMaestro':{
					'Clv_FacturaMaestro': objPagar.Clv_FacturaMaestro,
					'ContratoMaestro': objPagar.ContratoMaestro,
					'Cajera': objPagar.Cajera,
					'Caja':0,
     				'IpMaquina': objPagar.IpMaquina,
					'Sucursal': objPagar.Sucursal,
					'Monto': objPagar.Monto,
					'GLOEFECTIVO2': objPagar.GLOEFECTIVO2,
					'GLOCHEQUE2': objPagar.GLOCHEQUE2,
					'GLOCLV_BANCOCHEQUE2': objPagar.GLOCLV_BANCOCHEQUE2,
					'NUMEROCHEQUE2': objPagar.NUMEROCHEQUE2,
					'GLOTARJETA2': objPagar.GLOTARJETA2,
					'GLOCLV_BANCOTARJETA2': objPagar.GLOCLV_BANCOTARJETA2,
					'NUMEROTARJETA2': objPagar.NUMEROTARJETA2,
					'TARJETAAUTORIZACION2': objPagar.TARJETAAUTORIZACION2,
					'CLV_Nota3': objPagar.CLV_Nota3,
					'GLONOTA3': objPagar.GLONOTA3,
					'IdMedioPago': objPagar.IdMedioPago,
					'IdCompania': objPagar.IdCompania,
					'IdDistribuidor': objPagar.IdDistribuidor
				}
			};
			console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.grabaFactura, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dimeSiYaGrabeFacMaestro = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoMae': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dimeSiYaGrabeFacMaestro, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.nuePagoEfectivoMaestro = function(factura,efectivo,cambio) {
			var deferred = $q.defer();
			var Parametros = {
				'objNUEPago_En_EfectivoDetMaestro':
					{
						'Clv_FacturaMaestro': factura,
						'Efectivo': efectivo ,
						'Cambio': cambio
					}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.nuePagoEfectivoMaestro, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.nuePagoEfectivoPago = function(pago,efectivo,cambio) {
			var deferred = $q.defer();
			var Parametros = {
				'objNUEPago_En_EfectivoDetPago': 
				{
					'Clv_Pago': pago,
					'Efectivo': efectivo,
					'Cambio': cambio
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.nuePagoEfectivoPago, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.pagoGrabaFactura = function(objPagar) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_FacturaMaestro': objPagar.Clv_FacturaMaestro,
				'ContratoMaestro': objPagar.ContratoMaestro,
				'Cajera': objPagar.Cajera,
				'IpMaquina': objPagar.IpMaquina,
				'Sucursal': objPagar.Sucursal,
				'Monto': objPagar.Monto,
				'IdMedioPago': objPagar.IdMedioPago,
				'IdCompania': objPagar.IdCompania,
				'IdDistribuidor': objPagar.IdDistribuidor
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.pagoGrabaFactura, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.getMedios = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getMedios, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.actFactura = function(objPagar) {
			var deferred = $q.defer();
			var Parametros = {
				'objActualizaFacturaMaestro': 
				{ 
					'ClvFacturaMaestro': objPagar.ClvFacturaMaestro, 
					'Credito': objPagar.Credito, 
					'NoPago': objPagar.NoPago, 
					'PagoInicial': objPagar.PagoInicial 
				}       
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.actFactura, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.obtenFacturas = function(clvFactura) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvFacturaMaestro': clvFactura
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.obtenFacturas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameDetalle = function(clvSesionPadre) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_SessionPadre': clvSesionPadre
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameDetalle, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.verFacturas = function(clvPago) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Pago': clvPago
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.verFacturas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.buscarPagos = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'Fecha': obj.Fecha,
				'Ticket': obj.Ticket,
				'ContratoMaestro': obj.ContratoMaestro,
				'Cliente': obj.Cliente,
				'Op': obj.Op,
				'Saldada2': obj.Saldada2,
				'IdMedioPago': obj.IdMedioPago,
				'ContratoCompania': obj.ContratoCompania
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarPagos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.generaFactura = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoMaestro': obj.ContratoMaestro,
				'Credito': obj.Credito,
				'Cajera': obj.Cajera,
				'IpMaquina': obj.IpMaquina,
				'Sucursal': obj.Sucursal,
				'IdCompania': obj.IdCompania,
				'IdDistribuidor': obj.IdDistribuidor,
				'ClvSessionPadre': obj.ClvSessionPadre,
				'Tipo': obj.Tipo,
				'ToKen2': obj.ToKen2,
				'NoPagos' : obj.NoPagos,
				'PagoInicial': obj.PagoInicial
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.generaFactura, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameDetalleFactura = function(clvSesionPadre) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvFacturaMaestro': clvSesionPadre
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameDetalleFactura, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.GetBuscaFacturasMaestroPendientesList = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'Fecha': obj.Fecha,
				'Ticket': obj.Ticket,
				'ContratoMaestro': obj.ContratoMaestro,
				'Cliente': obj.Cliente,
				'Op': obj.Op,
				'ContratoCompania': obj.ContratoCompania
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetBuscaFacturasMaestroPendientesList, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};
		
		return factory;
	});
