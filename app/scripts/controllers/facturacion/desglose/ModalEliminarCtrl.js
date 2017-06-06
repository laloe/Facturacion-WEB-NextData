'use strict';
angular
	.module('softvApp')
	.controller('ModalEliminarCtrl', function($uibModalInstance, consecutivo, desgloseFactory, $rootScope, ngNotify) {

		function eliminarEntrega() {
			desgloseFactory.deleteDesglose(vm.consecutivo).then(function(data) {
				$uibModalInstance.dismiss('cancel');
				ngNotify.set('Desglose de Moneda Eliminado Correctamente', 'success');
				$rootScope.$emit("updateDesglose", {});
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.consecutivo = consecutivo;
		vm.eliminarEntrega = eliminarEntrega;
	});
