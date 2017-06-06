'use strict';
angular
	.module('softvApp')
	.controller('EliminarEntregaCtrl', function($uibModalInstance, consecutivo, entregasFactory, $rootScope, ngNotify) {
		function eliminarEntrega() {
			entregasFactory.eliminarEntrega(vm.consecutivo).then(function(data) {
				$uibModalInstance.dismiss('cancel');
				ngNotify.set('Entrega Parcial Eliminada Correctamente.', 'error');
				$rootScope.$emit('updateEntrada', {});
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
