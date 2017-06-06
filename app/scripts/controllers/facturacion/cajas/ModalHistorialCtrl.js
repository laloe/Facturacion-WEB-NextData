'use strict';
angular
	.module('softvApp')
	.controller('ModalHistorialCtrl', function($uibModal, $uibModalInstance, contrato, cajasFactory) {
		function init() {
			vm.tieneSaldo = false;
			cajasFactory.ValidaHistorialContrato(contrato).then(function(data) {
				if (data.GetDeepValidaHistorialContratoResult.tieneSaldo > 0) {
					vm.tieneSaldo = true;
				}
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {
			if (vm.historial == 1) {
				vm.animationsEnabled = true;
				$uibModalInstance.dismiss('cancel');
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
							return contrato;
						}
					}
				});
			} else if (vm.historial == 2) {
				vm.animationsEnabled = true;
				$uibModalInstance.dismiss('cancel');
				var modalInstance = $uibModal.open({
					animation: vm.animationsEnabled,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/facturacion/modalOrdenes.html',
					controller: 'ModalOrdenesCtrl',
					controllerAs: 'ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'lg',
					resolve: {
						contrato: function() {
							return contrato;
						}
					}
				});
			} else if (vm.historial == 4) {
				vm.animationsEnabled = true;
				$uibModalInstance.dismiss('cancel');
				var modalInstance = $uibModal.open({
					animation: vm.animationsEnabled,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/facturacion/modalHistorialEdocta.html',
					controller: 'modalHistorialEdoctaCtrl',
					controllerAs: 'ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'lg',
					resolve: {
						contrato: function() {
							return contrato;
						}
					}
				});
			} else {
				vm.animationsEnabled = true;
				$uibModalInstance.dismiss('cancel');
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
							return contrato;
						}
					}
				});
			}
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		vm.historial = 1;
		vm.tieneSaldo = false;
		init();

	});
