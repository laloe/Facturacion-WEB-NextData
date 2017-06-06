'use strict';
angular.module('softvApp').controller('DetalleCtrl', DetalleCtrl);

function DetalleCtrl($uibModal, ngNotify, inMenu, $uibModalInstance, x, pagosMaestrosFactory) {
	function initial() {
		pagosMaestrosFactory.dameDetalleFactura(x.Clv_FacturaMaestro).then(function (data) {
			vm.detalles = data.GetDameDetalle_FacturaMaestroListResult;
			
		});
	}
	
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
	vm.ticket = x.Ticket;
	initial();
}