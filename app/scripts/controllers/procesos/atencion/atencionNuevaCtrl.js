'use strict';
angular
	.module('softvApp')
	.controller('AtencionNuevaCtrl', function($uibModal, atencionFactory, ngNotify, $rootScope, $state, $stateParams, $filter) {
		function initialData() {
			atencionFactory.serviciosNuevo().then(function(data) {
				vm.servicios = data.GetMuestraTipSerPrincipal2ListResult;
				vm.selectedServicio = vm.servicios[0];
				MuestraTrabajos(vm.selectedServicio.Clv_TipSerPrincipal);
				GetClasificacionProblemas();
			});
		}

		function GetClasificacionProblemas() {
			atencionFactory.GetClasificacionProblemas().then(function(data) {
				vm.clasificacionProblemas = data.GetuspConsultaTblClasificacionProblemasListResult;
			});
		}

		function GetclasificacionQuejas() {
			atencionFactory.getclasificacionQuejas().then(function(data) {
				vm.Departamentos = data.GetMUESTRACLASIFICACIONQUEJASListResult;
			});
		}

		function GetprioridadQueja() {
			atencionFactory.GetprioridadQueja().then(function(data) {
				vm.Prioridades = data.GetSoftv_GetPrioridadQuejaListResult;
			});
		}

		function MuestraTrabajos(tipo) {
			atencionFactory.MuestraTrabajos(tipo).then(function(data) {
				vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
			});
		}

		function CambioServicio(servicio) {
			MuestraTrabajos(servicio.Clv_TipSerPrincipal);
		}

		function abrirPagos() {
			if (vm.GlobalContrato == null) {
				ngNotify.set('Establezca el contrato del cliente para obtener información', 'error');
				return;
			}
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalTickets.html',
				controller: 'ModalTicketsCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					contrato: function() {
						return vm.GlobalContrato;
					}
				}
			});
		}


		function abrirDetalleCobro() {
			if (vm.GlobalContrato == null) {
				ngNotify.set('Establezca el contrato del cliente para obtener la información', 'error');
				return;
			}
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalDetalleCobro.html',
				controller: 'ModalDetalleCobroCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				resolve: {
					contrato: function() {
						return vm.GlobalContrato;
					}
				}
			});
		}

		function abrirAgenda() {
			var options = {};
			options.Contrato = vm.GlobalContrato;
			options.CLV_TIPSER = vm.selectedServicio.Clv_TipSerPrincipal;
			options.Problema = vm.DescripcionProblema;
			options.Solucion = vm.DescripcionSolucion;
			options.Clv_Trabajo = vm.Trabajo.CLV_TRABAJO;
			options.clvPrioridadQueja = vm.Prioridad.clvPrioridadQueja;
			options.clv_llamada = vm.NumeroLlamada;
			options.clvProblema = vm.Problema.clvProblema;
			options.clv_queja = 0;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalAgenda.html',
				controller: 'ModalAgendaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "sm",
				resolve: {
					options: function() {
						return options;
					}
				}
			});
		}


		function abrirBusquedaCliente() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalBuscaCliente.html',
				controller: 'ModalBuscaClienteCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				resolve: {
					// options: function() {
					// 	return options;
					// }
				}
			});
		}

		function openHistorial() {
			if (vm.GlobalContrato == null) {
				ngNotify.set('Establezca el contrato del cliente para Obtener información', 'error');
				return;
			}
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalReportes.html',
				controller: 'ModalReportesCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					contrato: function() {
						return vm.GlobalContrato;;
					}
				}
			});
		}


		function AddLLamadasdeInternet(showDetails) {
			var atencion = (vm.tipoAtencion == 'telefonica') ? 'S' : 'T';
			var trabajo = (vm.Trabajo == undefined) ? 0 : vm.Trabajo.CLV_TRABAJO;
			var solucion = (vm.DescripcionSolucion == undefined) ? '' : vm.DescripcionSolucion;
			var parametros = {
				'Contrato': vm.GlobalContrato,
				'Descripcion': vm.DescripcionProblema,
				'Solucion': solucion,
				'Clv_trabajo': trabajo,
				'clv_queja': 0,
				'CLV_TIPSER': vm.selectedServicio.Clv_TipSerPrincipal,
				'TipoAtencion': atencion,
				'ClvProblema': vm.Problema.clvProblema
			}
			console.log(parametros);

			atencionFactory.AddLLamadasdeInternet(parametros).then(function(data) {
				vm.NumeroLlamada = data.AddLLamadasdeInternetResult;
				if (showDetails == true) {
					$state.go('home.procesos.atencion');
					ngNotify.set('Se ha guardado la llamada,número de atencíon telefonica #' + vm.NumeroLlamada);
				}

			});

		}

		$rootScope.$on('cliente_seleccionado', function(e, detalle) {

			var contrato = detalle.ContratoBueno;
			vm.GlobalContrato = contrato;
			vm.contrato = detalle.CONTRATO;
			vm.contratoSelected=detalle.CONTRATO;
			vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
			vm.Calle = detalle.CALLE;
			vm.Numero = detalle.NUMERO;
			vm.Colonia = detalle.COLONIA;
			vm.Ciudad = detalle.CIUDAD;
			//vm.DireccionCliente = "Calle:" + detalle.CALLE + " #" + detalle.NUMERO + " Colonia: " + detalle.COLONIA + " Ciudad:" + detalle.CIUDAD;
			atencionFactory.getServiciosCliente(contrato).then(function(data) {
				vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;
			});
		})

		function MuestraMensajeQueja() {
			vm.MuestraMensajeQueja = true;
			vm.MensajeQueja = "El cliente cuenta con una Queja pendiente"
		}

		function EnterContrato(event) {
			if (vm.selectedServicio == null) {
				ngNotify.set('Seleccione el servicio que tiene el cliente', 'error');
				return;
			}
			if (event.keyCode == 13) {
				if (vm.contrato == null || vm.contrato == '') {
					ngNotify.set('Coloque un contrato válido', 'error');
					return;
				}
				var res = vm.contrato.split("-");

				if (res.length == 1) {
					ngNotify.set('Coloque un contrato válido ej. 15-1', 'error');
					return
				}

				vm.GlobalContrato = null;
				vm.NombreCliente = 'No especificado';
				vm.DireccionCliente = 'No especificado';
				vm.ServiciosCliente = [];
				var param = {};
				param.contrato = vm.contrato;
				param.servicio = vm.selectedServicio.Clv_TipSerPrincipal;
				param.op = 0;
				atencionFactory.buscarCliente(param).then(function(data) {
					console.log(data);
					var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
					var contrato = detalle.ContratoBueno;
					vm.GlobalContrato = contrato;
					atencionFactory.ValidaContrato(vm.GlobalContrato, vm.selectedServicio.Clv_TipSerPrincipal).then(function(data) {

						if (data.GetuspContratoServListResult[0].Pasa == true) {
							MuestraMensajeQueja();
							vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;

							vm.Calle = detalle.CALLE;
							vm.Numero = detalle.NUMERO;
							vm.Colonia = detalle.COLONIA;
							vm.Ciudad = detalle.CIUDAD
							// vm.DireccionCliente = "Calle: " + detalle.CALLE + " #" + detalle.NUMERO + " Colonia: " + detalle.COLONIA + " Ciudad:" + detalle.CIUDAD;
							atencionFactory.getServiciosCliente(contrato).then(function(data) {
								vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;

							});
						} else {
							vm.GlobalContrato = null;
							ngNotify.set('El cliente no tiene contratado el servicio, seleccione otro tipo por favor.', 'error');
						}
					});


				});
			}
		}

		function GuardarLlamada() {
			if (vm.GlobalContrato == null) {
				ngNotify.set('Establezca el contrato del cliente para generar un reporte .', 'error');
				return;
			}
			if (vm.DescripcionProblema == null || vm.DescripcionProblema == '') {
				ngNotify.set('Redacte la descripción del problema', 'error');
				return;
			}
			if (vm.Problema == null) {
				ngNotify.set('Seleccione la clasificación del problema', 'error');
				return;
			}
			if (vm.Trabajo == null) {
				ngNotify.set('Seleccione la solución  del problema', 'error');
				return;
			}
			AddLLamadasdeInternet(true);
		}

		function generaReporte() {
			vm.MostrarGuardar = false;
			if (vm.GlobalContrato == null) {
				ngNotify.set('Establezca el contrato del cliente para generar un reporte .', 'error');
				return;
			}
			if (vm.DescripcionProblema == null || vm.DescripcionProblema == '') {
				ngNotify.set('Redacte la descripción del problema', 'error');
				return;
			}
			if (vm.Problema == null) {
				ngNotify.set('Seleccione la clasificación del problema', 'error');
				return;
			}
			if (vm.Trabajo == null) {
				ngNotify.set('Seleccione la solución  del problema', 'error');
				return;
			}

			vm.PanelCaptura = true;
			GetclasificacionQuejas();
			GetprioridadQueja();
			AddLLamadasdeInternet(false);

		}

		function DetalleLlamada(llamada) {
			console.log(llamada)
			atencionFactory.ConsultaLLamada(llamada).then(function(data) {
				console.log(data);
			});
		}

		function ValidaOrdenQuejas() {
			atencionFactory.ValidaOrdenQuejas(vm.GlobalContrato, vm.selectedServicio.Clv_TipSerPrincipal)
				.then(function(data) {
					console.log(data);
					if (data.GetDeepVALIDAOrdenQuejaResult.Msg == null) {
						abrirAgenda();
					} else {
						ngNotify.set(data.GetDeepVALIDAOrdenQuejaResult.Msg, 'error');
					}
				});
		}

		function CancelaReporte() {
			$state.go('home.procesos.atencion');
		}

		var vm = this;
		initialData();
		vm.abrirPagos = abrirPagos;
		vm.tipoAtencion = 'telefonica';
		vm.showDatosCliente = true;
		vm.EnterContrato = EnterContrato;
		vm.CambioServicio = CambioServicio;
		vm.generaReporte = generaReporte;
		vm.ValidaOrdenQuejas = ValidaOrdenQuejas;
		vm.BuscaCliente = abrirBusquedaCliente;
		vm.openHistorial = openHistorial;
		vm.abrirDetalleCobro = abrirDetalleCobro;
		vm.PanelCaptura = false;
		vm.MuestraMensajeQueja = false;
		vm.GuardarLlamada = GuardarLlamada;
		vm.DetalleLlamada = DetalleLlamada;
		vm.titulo = "Nueva atención telefónica";
		vm.bloquearContrato = false;
		vm.MostrarGuardar = true;
		vm.MostrarEditar = false;
		vm.Fechas = new Date();
		vm.Hora = $filter('date')(new Date(), 'HH:mm:ss');
		vm.Fecha = $filter('date')(new Date(), 'dd-MM-yyyy');
		vm.CancelaReporte = CancelaReporte;
	});
