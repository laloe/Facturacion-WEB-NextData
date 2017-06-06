'use strict';
angular.module('softvApp')
	.controller('MotivoTicketCtrl', function($uibModalInstance, ticketsFactory, $rootScope, ngNotify, item) {
		function initialData() {
			ticketsFactory.getMotivo(item.op).then(function(data) {
				vm.motivos = data.GetMUESTRAMOTIVOSListResult;
				vm.selectedMotivo = vm.motivos[0];
			});
		}

		function ok() {
			if (item.tipo == 'N') {
				ticketsFactory.guardaMotivo(item.clv_Factura, vm.selectedMotivo.Clv_Motivo).then(function(data) {
					ticketsFactory.addBitacora(item.clv_Factura, item.cliente, 1).then(function(dataBit) {
						$uibModalInstance.dismiss('cancel');
						var obj = {
							factura: item.clv_Factura,
							reimprimir: 0,
							cancelar: 1,
							correo: 0
						};
						ticketsFactory.getOptionsTickets(obj).then(function(opt) {
							$rootScope.$emit('actualiza_tickets', {});
							ngNotify.set('El ticket se cancelo exitosamente', 'success');
						});

					});
				});
			} else {
				ticketsFactory.guardaMotivo(item.Clv_Factura, vm.selectedMotivo.Clv_Motivo).then(function(data) {
					ticketsFactory.canEspeceiales(item.Clv_Factura).then(function(dataCan) {
						ticketsFactory.addBitacora(item.Clv_Factura, item.cliente, 3).then(function(dataBit) {
							$uibModalInstance.dismiss('cancel');
							ngNotify.set(dataCan.GetCANCELACIONFACTURASListResult.Msg, 'success');
							var obj = {
								factura: item.Clv_Factura,
								reimprimir: 0,
								cancelar: 1,
								correo: 0
							};
							ticketsFactory.getOptionsTickets(obj).then(function(opt) {
								$rootScope.$emit('actualiza_tickets_especial', {});
								ngNotify.set('El ticket se cancelo exitosamente', 'success');
							});

						});
					});

				});
			}

		}

		var vm = this;
		vm.ok = ok;
		initialData();
	});
