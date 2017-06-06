'use strict';
angular
	.module('softvApp')
	.controller('ModalConsultaQuejaCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, detalle, atencionFactory, quejasFactory) {

		function initialData() {
			console.log(detalle);
			vm.clv_queja = detalle.Clv_Queja;
			vm.contrato = detalle.Contrato;
			vm.Servicio = detalle.Clv_TipSer;

			var param = {};
			param.contrato = vm.contrato;
			param.servicio = vm.Servicio;
			param.op = 0;
			atencionFactory.buscarCliente(param).then(function(data) {
				console.log(data);
				var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
				var contrato = detalle.ContratoBueno;
				vm.GlobalContrato = contrato;
				vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
				vm.Calle = detalle.CALLE;
				vm.Numero = detalle.NUMERO;
				vm.Colonia = detalle.COLONIA;
				vm.Ciudad = detalle.CIUDAD;
				atencionFactory.getServiciosCliente(contrato).then(function(data) {
					vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;

					quejasFactory.ConsultaQueja(vm.clv_queja).then(function(data) {
						var detqueja = data.GetQuejasListResult[0];
						console.log(detqueja);
						vm.UsuarioGenero = detqueja.UsuarioGenero;
						vm.UsuarioEjecuto = detqueja.UsuarioEjecuto;
						vm.TecnicoAgenda = detqueja.NombreTecAge;
						vm.TurnoAgenda = detqueja.TurnoAge;
						vm.FechaAgenda = detqueja.FechaAge;
						vm.ComentarioAgenda = detqueja.ComentarioAge;
						vm.DetalleProblema = detqueja.Problema;
						vm.Observaciones = detqueja.Observaciones;
						vm.DetalleSolucion = detqueja.Solucion;
						vm.FechaSolicitud = detqueja.Fecha_Soliciutud;
						vm.FechaEjecucion = detqueja.Fecha_Ejecucion;
						vm.FechaProceso = detqueja.FechaProceso;
						vm.FechaVisita1 = detqueja.HV1;
						vm.FechaVisita2 = detqueja.HV2;
						vm.FechaVisita3 = detqueja.HV3;
						vm.Departamento = detqueja.Clasificacion;
						vm.Clv_trabajo = detqueja.Clv_Trabajo;
						vm.Clv_prioridad = detqueja.clvPrioridadQueja;
						vm.Clv_problema = detqueja.clvProblema;
						vm.ProblemaReal = detqueja.Solucion;
						//detqueja.Visita
						vm.Visita = true;
						vm.Clv_status = detqueja.Status;
						for (var t = 0; t < vm.Status.length; t++) {
							if (vm.Status[t].Clave == vm.Clv_status) {
								vm.Estatus = vm.Status[t];
								//Bloqueo(true);
							}
						}


						quejasFactory.ObtenTecnicos(vm.GlobalContrato).then(function(data) {
							console.log(data);
							vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
						});

						atencionFactory.MuestraTrabajos(vm.Servicio).then(function(data) {
							vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
							for (var a = 0; a < vm.Trabajos.length; a++) {
								if (vm.Trabajos[a].CLV_TRABAJO == vm.Clv_trabajo) {
									vm.Trabajo = vm.Trabajos[a];
								}
							}
						});

						quejasFactory.ObtenPrioridad().then(function(data) {
							vm.Prioridades = data.GetSoftv_GetPrioridadQuejaListResult;
							for (var a = 0; a < vm.Prioridades.length; a++) {
								if (vm.Prioridades[a].clvPrioridadQueja == vm.Clv_prioridad) {
									vm.Prioridad = vm.Prioridades[a];
								}
							}
						});
						atencionFactory.getServicios().then(function(data) {
							vm.Servicios = data.GetMuestraTipSerPrincipalListResult;
							for (var a = 0; a < vm.Servicios.length; a++) {
								if (vm.Servicios[a].Clv_TipSerPrincipal == vm.Servicio) {
									vm.Servicio = vm.Servicios[a];
								}
							}
						});

						atencionFactory.GetClasificacionProblemas().then(function(data) {
							vm.Problemas = data.GetuspConsultaTblClasificacionProblemasListResult;
							for (var a = 0; a < vm.Problemas.length; a++) {
								if (vm.Problemas[a].clvProblema == vm.Clv_problema) {
									vm.Problema = vm.Problemas[a];
								}
							}
						});

					});

				});

				quejasFactory.BuscaBloqueado(vm.GlobalContrato).then(function(data) {
					if (data.GetDeepBuscaBloqueadoResult.Bloqueado == 1) {
						$state.go('home.procesos.reportes');
						ngNotify.set('El cliente ' + vm.contrato + ', ha sido bloqueado, por lo que no se podrá ejecutar la orden', 'error');
					}
				});

			});
		}

		function ok() {

		}

		function Eliminar() {
			$uibModalInstance.dismiss('cancel');
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}



		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		vm.Eliminar = Eliminar;
		vm.Status = [{
				'Clave': 'P',
				'Nombre': 'Pendiente'
			},
			{
				'Clave': 'V',
				'Nombre': 'Con visita'
			},
			{
				'Clave': 'E',
				'Nombre': 'Ejecutada'
			},
			{
				'Clave': 'S',
				'Nombre': 'En Proceso'
			}
		];
		initialData();


	});
