'use strict';
angular.module('softvApp').controller('HistorialCtrl', HistorialCtrl);

function HistorialCtrl($uibModal, ngNotify, inMenu, $uibModalInstance, x, pagosMaestrosFactory) {
	function initial() {
		pagosMaestrosFactory.obtenFacturas(x.Clv_FacturaMaestro).then(function (data) {
			vm.facturas = data.GetObtieneHistorialPagosFacturaMaestroListResult;
		});
	}

	function verFactura(clvPago) {
		vm.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/corporativa/facturas.html',
            controller: 'FacturasCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            resolve: {
                clvPago: function () {
                    return clvPago;
                }
            }
        });
	}
	
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.verFactura = verFactura;
	vm.cancel = cancel;
	vm.ticket = x.Ticket;
	initial();
}