'use strict';
angular
	.module('softvApp')
	.controller('ModalInformationCtrl', function($uibModalInstance, cajasFactory, contrato) {

		function initialData() {
			cajasFactory.dameInformacionCliente(contrato).then(function(data) {
				vm.informacionCliente = data.GetInformacionClientePeriodosListResult[0];
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		initialData();

	});
