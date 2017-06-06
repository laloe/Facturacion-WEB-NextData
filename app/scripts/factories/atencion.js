'use strict';
angular
	.module('softvApp')
	.factory('atencionFactory', function($http, $q, globalService, $localStorage) {
		var paths = {
			plazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
			servicios: '/MuestraTipSerPrincipal/GetMuestraTipSerPrincipalList',
			usuarios: '/MUESTRAUSUARIOS/GetMUESTRAUSUARIOSList',
			buscarAtencion: '/uspBuscaLLamadasDeInternet/GetuspBuscaLLamadasDeInternetList',
			colonias: '/uspConsultaColonias/GetuspConsultaColoniasList',
			serviciosNuevo: '/MuestraTipSerPrincipal2/GetMuestraTipSerPrincipal2List',
			buscarCliente: '/uspBuscaContratoSeparado2/GetuspBuscaContratoSeparado2List',
			servicioCliente: '/DameSerDelCliFac/GetDameSerDelCliFacList',
			clasificacionProblemas: '/uspConsultaTblClasificacionProblemas/GetuspConsultaTblClasificacionProblemasList',
			MuestraTrabajos: '/MUESTRATRABAJOSQUEJAS/GetMUESTRATRABAJOSQUEJASList',
			ValidaContrato: '/uspContratoServ/GetuspContratoServList',
			clasificacionQuejas: '/MUESTRACLASIFICACIONQUEJAS/GetMUESTRACLASIFICACIONQUEJASList',
			prioridadQueja: '/Softv_GetPrioridadQueja/GetSoftv_GetPrioridadQuejaList',
			AddLLamadasdeInternet: '/LLamadasdeInternet/AddLLamadasdeInternet',
			ValidaOrdenQuejas: '/VALIDAOrdenQueja/GetDeepVALIDAOrdenQueja',
			MuestraTecnicosAlmacen: '/Muestra_Tecnicos_Almacen/GetMuestra_Tecnicos_AlmacenList',
			ConsultaTurnos: '/spConsultaTurnos/GetspConsultaTurnosList',
			AgregaQueja: '/Quejas/AddQuejas',
			ActualizaLlamada: '/LLamadasdeInternet/UpdateLLamadasdeInternet',
			ActualizaQuejaCallCenter: '/Actualizar_quejasCallCenter/GetDeepActualizar_quejasCallCenter',
			ConsultaColoniasPorUsuario: '/uspConsultaColoniasPorUsuario/GetuspConsultaColoniasPorUsuarioList',
			ConsultaLLamada: '/LLamadasdeInternet/GetLLamadasdeInternetList'

		};
		var factory = {};
		var usuarioAtencion = $localStorage.currentUser.idUsuario;

		factory.ConsultaColoniasPorUsuario = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'IdUsuario': user,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ConsultaColoniasPorUsuario, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.ConsultaLLamada = function(llamada) {

			var deferred = $q.defer();
			var Parametros = {
				'clv_llamada': llamada,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ConsultaLLamada, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.getPlazas = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'ClvUsuario': user,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.plazas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.MuestraTrabajos = function(tipo) {
			var deferred = $q.defer();
			var Parametros = {
				'TipSer': tipo,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.MuestraTrabajos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.AddLLamadasdeInternet = function(param) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			param.Clv_Usuario = user;
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};


			$http.post(globalService.getUrl() + paths.AddLLamadasdeInternet, JSON.stringify({
				'objLLamadasdeInternet': param
			}), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;

		};

		factory.ValidaContrato = function(contrato, servicio) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'TipSer': servicio

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ValidaContrato, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetClasificacionProblemas = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.clasificacionProblemas, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getclasificacionQuejas = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.clasificacionQuejas, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetprioridadQueja = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.prioridadQueja, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getServiciosCliente = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.servicioCliente, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getServicios = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.servicios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getUsuarios = function() {
			var deferred = $q.defer();
			var Parametros = {
				'OP': 2
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.usuarios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.buscarAtencion = function(objAte) {

			var deferred = $q.defer();
			var Parametros = {
				'TipSer': objAte.servicio,
				'NumReporte': objAte.reporte,
				'ContratoCom': objAte.contrato,
				'Nombre': objAte.nombre,
				'AP': objAte.paterno,
				'AM': objAte.materno,
				'Calle': objAte.calle,
				'Numero': objAte.numero,
				'clvColonia': objAte.colonia,
				'SetUpBox': objAte.setupbox,
				'IdUsuario': usuarioAtencion,
				'Op': objAte.op,
				'Id_Compania': objAte.compania,
				'ClvUsuario': $localStorage.currentUser.idUsuario
			};

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarAtencion, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getColonias = function(idcomp) {
			var deferred = $q.defer();
			var Parametros = {
				'idcompania': idcomp
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.colonias, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.serviciosNuevo = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.serviciosNuevo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.buscarCliente = function(obje) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoCom': obje.contrato,
				'Nombre': obje.nombre,
				'Apellido_Paterno': obje.paterno,
				'Apellido_Materno': obje.materno,
				'CALLE': obje.calle,
				'NUMERO': obje.numero,
				'ClvColonia': obje.colonia,
				'SetupBox': obje.setupbox,
				'IdUsuario': $localStorage.currentUser.idUsuario,
				'TipoSer': obje.servicio,
				'Op': obje.op
			};


			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarCliente, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.ValidaOrdenQuejas = function(contrato, servicio) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'TipSer': servicio,
				'Usuario': $localStorage.currentUser.usuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ValidaOrdenQuejas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.MuestraTecnicosAlmacen = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.MuestraTecnicosAlmacen, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};


		factory.ConsultaTurnos = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.ConsultaTurnos, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.AgregaQueja = function(objeto) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'Clv_TipSer': objeto.Clv_TipSer,
				'Contrato': objeto.Contrato,
				'Problema': objeto.Problema,
				'Solucion': objeto.Solucion,
				'Clv_Trabajo': objeto.Clv_Trabajo,
				'clvPrioridadQueja': objeto.clvPrioridadQueja,
				'Usuario': $localStorage.currentUser.usuario,
				'IdUsuario': $localStorage.currentUser.idUsuario,
				'Clv_Tecnico': objeto.Clv_Tecnico,
				'Turno': objeto.Turno,
				'COMENTARIO': objeto.COMENTARIO,
				'clv_llamada': objeto.clv_llamada,
				'clvProblema': objeto.clvProblema
			};


			$http.post(globalService.getUrl() + paths.AgregaQueja, JSON.stringify({
				'objQuejas': parametros
			}), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;

		};

		factory.ActualizaLlamada = function(objeto) {

			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'clv_llamada': objeto.clv_llamada,
				'Descripcion': objeto.Descripcion,
				'Solucion': objeto.Solucion,
				'Clv_trabajo': objeto.Clv_Trabajo,
				'clv_queja': objeto.clv_queja,
				'CLV_TIPSER': objeto.CLV_TIPSER,
				'Turno': objeto.Turno
			};
			console.log(parametros);
			console.log(JSON.stringify({
				'objLLamadasdeInternet': parametros
			}));
			$http.post(globalService.getUrl() + paths.ActualizaLlamada, JSON.stringify({
				'objLLamadasdeInternet': parametros
			}), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.ActualizaQuejaCallCenter = function(objeto) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'clv_queja': objeto.clv_queja,
				'CallCenter': 1
			};

			$http.post(globalService.getUrl() + paths.ActualizaQuejaCallCenter, JSON.stringify(
				parametros
			), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};



		return factory;
	});
