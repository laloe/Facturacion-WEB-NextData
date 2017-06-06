'use strict';
angular
	.module('softvApp')
	.controller('ModalYaPagoCtrl', function($uibModal, cajasFactory, $uibModalInstance, items) {

		function ok() {
			$uibModalInstance.dismiss('cancel');
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalPagar.html',
				controller: 'ModalPagarCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					items: function() {
						return items;
					}
				}
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
	});
