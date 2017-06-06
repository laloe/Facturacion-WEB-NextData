'use strict';
angular
	.module('softvApp')
	.controller('ModalAgendaCtrl', function($uibModalInstance, $uibModal, options, atencionFactory, $rootScope, ngNotify, $localStorage, $state) {

		function initialData() {
			atencionFactory.MuestraTecnicosAlmacen(options.Contrato).then(function(data) {
				vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
				atencionFactory.ConsultaTurnos().then(function(data) {
					vm.Turnos = data.GetspConsultaTurnosListResult;
				});
			});

		}

		function ok() {

			if (vm.TecnicoAgenda == null || vm.TecnicoAgenda == undefined) {
				ngNotify.set('Selecciona un técnico para continuar', 'error');
				return;
			}
			if (vm.TurnoAgenda == null || vm.TurnoAgenda == undefined) {
				ngNotify.set('Selecciona un turno para continuar', 'error');
				return;
			}
			if (vm.FechaAgenda == null || vm.FechaAgenda == undefined) {
				ngNotify.set('Selecciona un fecha para continuar', 'error');
				return;
			}
			options.Clv_Tecnico = vm.TecnicoAgenda.clv_Tecnico;
			options.Turno = vm.TurnoAgenda.ID;
			options.COMENTARIO = vm.ComentarioAgenda;
			console.log(options);
			if (options.clv_queja == 0) {
				atencionFactory.AgregaQueja(options).then(function(data) {
					var clv_queja = data.AddQuejasResult;
					options.clv_queja = clv_queja;

					atencionFactory.ActualizaLlamada(options).then(function(data) {
						var iduser = $localStorage.currentUser.idUsuario;
						if (iduser == 53) {
							atencionFactory.ActualizaLlamada(options).then(function(data) {
								ngNotify.set('El # de reportes es el: ' + clv_queja + ' y el número de atención telefónica es: ' + options.clv_llamada);
								$state.go('home.procesos.atencion');
							});
						}
						$uibModalInstance.dismiss('cancel');
						ngNotify.set('El # de reportes es el: ' + clv_queja + ' y el número de atención telefónica es: ' + options.clv_llamada, 'grimace');
						$state.go('home.procesos.atencion');
					});
				});
			} else {
				ngNotify.set('No se puede realizar una queja, ya que La llamada ya presenta una queja.', 'error');
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
