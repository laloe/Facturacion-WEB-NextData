'use strict';
angular
	.module('softvApp')
	.controller('ModalTicketsCtrl', function($uibModal, $uibModalInstance, cajasFactory, contrato) {

		function initialData() {
			cajasFactory.dameHistorialServicios(contrato).then(function(data) {
				vm.tickets = data.GetBuscaFacturasHistorialListResult;
				console.log(vm.tickets);
			});
		}

		function dameFactura(factura) {
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
						return factura;
					},
					imprimir: function() {
						return false;
					}
				}
			});
		}

		function dameNota(factura) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalSingleNota.html',
				controller: 'ModalSingleNotaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					factura: function() {
						return factura;
					}
				}
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.dameFactura = dameFactura;
		vm.dameNota = dameNota;
		initialData();

	});
