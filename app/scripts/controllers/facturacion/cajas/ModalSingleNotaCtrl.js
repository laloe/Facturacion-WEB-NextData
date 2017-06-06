'use strict';

function ModalSingleNotaCtrl($uibModalInstance, cajasFactory, factura) {
	this.$onInit = function() {
		cajasFactory.getNota(factura).then(function(data) {
			vm.nota = data.GetCrearNotaCreditoListResult[0];
		});
		cajasFactory.getNotaconceptos(factura).then(function(data) {
			vm.notaconceptos = data.GetConceptosTicketNotasCreditoListResult;
		});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
}

angular.module('softvApp').controller('ModalSingleNotaCtrl', ModalSingleNotaCtrl);
