'use strict';
angular.module('softvApp')
	.factory('ticketsFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getPlazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
			getTipoFactura: '/MUESTRATIPOFACTURA/GetMUESTRATIPOFACTURAList',
			buscarTickets: '/BUSCAFACTURAS/GetBUSCAFACTURASList',
			getSucursales: '/ObtieneSucursalesEspeciales_Reimpresion/GetObtieneSucursalesEspeciales_ReimpresionList',
			getFacturas: '/MUESTRATIPOFACTURA_Reimpresion/GetMUESTRATIPOFACTURA_ReimpresionList',
			buscarEspeciales: '/BuscaFacturasEspeciales/GetBuscaFacturasEspecialesList',
			validaCancela: '/ValidaCancelacionFactura/GetValidaCancelacionFacturaList',
			getMotivo: '/MUESTRAMOTIVOS/GetMUESTRAMOTIVOSList',
			guardaMotivo: '/GuardaMotivos/GetGuardaMotivosList',
			addBitacora: '/Bitacora/AddBitacoraTickets',
			validaEspecial: '/ValidaFacturaFiscal/GetValidaFacturaFiscal',
			canEspeceiales: '/CANCELACIONFACTURAS/GetCANCELACIONFACTURASList',
			getOptionsTickets: '/TblFacturasOpciones/AddTblFacturasOpciones'

		};

		factory.getPlazas = function() {
			var deferred = $q.defer();
			var Parametros = {
				'ClvUsuario': $localStorage.currentUser.idUsuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getPlazas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.getOptionsTickets = function(obj) {
			console.log(obj);
			var deferred = $q.defer();
			var Parametros = {
				'objTblFacturasOpciones': {
					'Clv_Factura': obj.factura,
					'OpCancelar': obj.cancelar,
					'OpReimprimir': obj.reimprimir,
					'OpCorreo': obj.correo
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getOptionsTickets, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.getTipoFactura = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTipoFactura, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.buscarTickets = function(objeto) {
			var deferred = $q.defer();
			var Parametros = {
				'Op': objeto.op,
				'Serie': objeto.serie,
				'Folio': objeto.folio,
				'FechaOp': objeto.fecha,
				'ContratoCom': objeto.contrato,
				'tipo': objeto.tipo,
				'IdCompania': objeto.compania,
				'NombreOp': objeto.nombre,
				'IdUsuario': $localStorage.currentUser.idUsuario
			};
			console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarTickets, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.getSucursales = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getSucursales, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.getFacturas = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getFacturas, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.buscarEspeciales = function(objeto) {
			var deferred = $q.defer();
			var Parametros = {
				'Op': objeto.op,
				'Serie': objeto.serie,
				'Folio': objeto.folio,
				'Fecha': objeto.fecha,
				'Tipo': objeto.tipo,
				'Contrato': objeto.contrato,
				'ClvSucursal': objeto.sucursal
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarEspeciales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.validaCancela = function(factura) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvFactura': factura
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.validaCancela, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.getMotivo = function(op) {
			var deferred = $q.defer();
			var Parametros = {
				'Op': op
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getMotivo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.guardaMotivo = function(factura, motivo) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvFactura': factura,
				'ClvMotivo': motivo,
				'Usuario': $localStorage.currentUser.usuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.guardaMotivo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.addBitacora = function(factura, contrato, op) {
			var deferred = $q.defer();
			var Parametros = {
				'objBitacora': {
					'Usuario': $localStorage.currentUser.usuario,
					'ContratoCom': contrato,
					'Op': op,
					'ClvFactura': factura
				}

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addBitacora, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.validaEspecial = function(factura) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvFactura': factura
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.validaEspecial, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.canEspeceiales = function(factura) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvFactura': factura
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.canEspeceiales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		return factory;

	});
