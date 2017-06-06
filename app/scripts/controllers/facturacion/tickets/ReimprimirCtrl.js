'use strict';
angular.module('softvApp')
	.controller('ReimprimirCtrl', function($uibModalInstance, $uibModal, ticketsFactory, $rootScope, ngNotify, item) {
		function initialData() {
			ticketsFactory.getMotivo(1).then(function(data) {
				vm.motivos = data.GetMUESTRAMOTIVOSListResult;
				vm.selectedMotivo = vm.motivos[0];
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {
			if (item.tipo == 'N') {
				vm.factura = item.clv_Factura;
			} else {
				vm.factura = item.Clv_Factura
			}
			ticketsFactory.guardaMotivo(vm.factura, vm.selectedMotivo.Clv_Motivo).then(function(data) {
				if (item.tipo == 'N') {
					ticketsFactory.addBitacora(vm.factura, item.cliente, 2).then(function(dataBit) {
						$uibModalInstance.dismiss('cancel');
						var obj = {
							factura: vm.factura,
							reimprimir: 1,
							cancelar: 0,
							correo: 0
						};
						ticketsFactory.getOptionsTickets(obj).then(function(opt) {
							var modalInstance = $uibModal.open({
								animation: true,
								ariaLabelledBy: 'modal-title',
								ariaDescribedBy: 'modal-body',
								templateUrl: 'views/facturacion/modalSingleTicket.html',
								controller: 'ModalSingleTicketCtrl',
								controllerAs: 'ctrl',
								backdrop: 'static',
								keyboard: false,
								size: 'sm',
								resolve: {
									factura: function() {
										return vm.factura;
									},
									imprimir: function() {
										return true;
									}
								}
							});
						});
					});
				} else {
					ticketsFactory.addBitacora(vm.factura, item.cliente, 4).then(function(dataBit) {
						$uibModalInstance.dismiss('cancel');
					});
					ticketsFactory.validaEspecial(vm.factura).then(function(dataValida) {
						if (dataValida.GetValidaFacturaFiscalResult.fiscal == 0) {
							var modalInstance = $uibModal.open({
								animation: true,
								ariaLabelledBy: 'modal-title',
								ariaDescribedBy: 'modal-body',
								templateUrl: 'views/facturacion/modalSingleTicket.html',
								controller: 'ModalSingleTicketCtrl',
								controllerAs: 'ctrl',
								backdrop: 'static',
								keyboard: false,
								size: 'sm',
								resolve: {
									factura: function() {
										return vm.factura;
									},
									imprimir: function() {
										return true;
									}
								}
							});
						}
						var obj = {
							factura: vm.factura,
							reimprimir: 1,
							cancelar: 0,
							correo: 0
						};
						ticketsFactory.getOptionsTickets(obj).then(function(opt) {});
					});
				}
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
