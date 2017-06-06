'use strict';
angular
	.module('softvApp')
	.controller('ModalDetalleContratoCtrl', function($uibModalInstance, $uibModal, ContratoMaestroFactory, $rootScope, ngNotify, contrato) {
		this.$onInit = function() {
			vm.contrato = contrato;
			
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
	});
