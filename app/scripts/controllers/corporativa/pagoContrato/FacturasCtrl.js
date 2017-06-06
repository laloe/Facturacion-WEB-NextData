'use strict';
angular.module('softvApp').controller('FacturasCtrl', FacturasCtrl);

function FacturasCtrl($uibModal, ngNotify, inMenu, $uibModalInstance, clvPago, pagosMaestrosFactory) {
	function initial() {
		pagosMaestrosFactory.verFacturas(clvPago).then(function (data) {
			vm.facturas = data.GetFacturasPorCliDePagoResult;
		});
	}
	
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
	initial();
}