'use strict';
angular
	.module('softvApp')
	.controller('AtencionEditarCtrl', function($uibModal, inMenu, atencionFactory, $state, $stateParams, ngNotify) {
		function initialData() {
			atencionFactory.serviciosNuevo().then(function(data) {
				vm.servicios = data.GetMuestraTipSerPrincipal2ListResult;
				vm.selectedServicio = vm.servicios[0];
				MuestraTrabajos(vm.selectedServicio.Clv_TipSerPrincipal);
				GetClasificacionProblemas();

				atencionFactory.ConsultaLLamada(vm.NumeroLlamada).then(function(data) {
					console.log(data);
					var datos = data.GetLLamadasdeInternetListResult[0];

					var param = {};
					param.contrato = datos.ContratoCom;
					param.servicio = datos.CLV_TIPSER;
					param.op = 0;
					atencionFactory.buscarCliente(param).then(function(data) {
						var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
						var contrato = detalle.ContratoBueno;
						vm.GlobalContrato = detalle.ContratoBueno;
						vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
						vm.Calle = detalle.CALLE;
						vm.Numero = detalle.NUMERO;
						vm.Colonia = detalle.COLONIA;
						vm.Ciudad = detalle.CIUDAD
						vm.contrato = datos.ContratoCom;
						vm.DescripcionProblema = datos.Descripcion;
						vm.DescripcionSolucion = datos.Solucion;
						vm.Fecha = datos.Fecha;
						vm.Hora = datos.HoraInicial;
						vm.clv_queja = datos.clv_queja;
						vm.Turno = datos.Turno;
						vm.UsuarioGenero = datos.UsuarioGenero;
						for (var a = 0; a < vm.Trabajos.length; a++) {
							if (vm.Trabajos[a].CLV_TRABAJO == datos.Clv_trabajo) {
								vm.Trabajo = vm.Trabajos[a];
							}
						}
						for (var b = 0; b < vm.clasificacionProblemas.length; b++) {
							if (vm.clasificacionProblemas[b].clvProblema == parseInt(datos.Clv_Problema)) {
								vm.Problema = vm.clasificacionProblemas[b];
							}
						}

						//vm.Problema.clvProblema = datos.Integer.parse(datos.Clv_Problema);
						//vm.Trabajo.CLV_TRABAJO = datos.Clv_trabajo;

						vm.DireccionCliente = "Calle: " + detalle.CALLE + " #" + detalle.NUMERO + " Colonia: " + detalle.COLONIA + " Ciudad:" + detalle.CIUDAD;
						atencionFactory.getServiciosCliente(contrato).then(function(data) {
							vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;

						});
					});

				});
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

		function GetClasificacionProblemas() {
			atencionFactory.GetClasificacionProblemas().then(function(data) {
				vm.clasificacionProblemas = data.GetuspConsultaTblClasificacionProblemasListResult;
			});
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

		function generaReporte() {
			vm.MostrarEditar = false;
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
			options.clv_queja = vm.clv_queja;
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

		function EditaLlamada() {
			var obj = {};
			obj.clv_llamada = vm.NumeroLlamada;
			obj.Descripcion = vm.DescripcionProblema;
			obj.Solucion = vm.DescripcionSolucion;
			obj.clv_queja = vm.clv_queja;
			obj.CLV_TIPSER = vm.selectedServicio.Clv_TipSerPrincipal;
			obj.Clv_Trabajo = vm.Trabajo.CLV_TRABAJO;
			obj.Turno = vm.Turno;
			atencionFactory.ActualizaLlamada(obj).then(function(data) {
				$state.go('home.procesos.atencion');
				ngNotify.set('La llamada #' + vm.NumeroLlamada + ' se ha editado correctamente', 'grimace');

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
		vm.bloquearContrato = true;
		vm.showDatosCliente = true;
		vm.titulo = "Edita atención telefónica";
		vm.NumeroLlamada = $stateParams.id;
		vm.openHistorial = openHistorial;
		vm.abrirDetalleCobro = abrirDetalleCobro;
		vm.PanelCaptura = false;
		vm.abrirPagos = abrirPagos;
		vm.MostrarGuardar = false;
		vm.MostrarEditar = true;
		vm.EditaLlamada = EditaLlamada;
		vm.generaReporte = generaReporte;
		vm.ValidaOrdenQuejas = ValidaOrdenQuejas;
		vm.CancelaReporte = CancelaReporte;
		initialData();

	});
