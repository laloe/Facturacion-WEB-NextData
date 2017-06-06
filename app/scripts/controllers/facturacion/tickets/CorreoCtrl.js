'use strict';
angular.module('softvApp').controller('CorreoCtrl', function($uibModalInstance, ticketsFactory, item) {

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	function ok() {
		var obj = {
			factura: item.Clv_Factura,
			reimprimir: 0,
			cancelar: 0,
			correo: 1
		};
		ticketsFactory.getOptionsTickets(obj).then(function(opt) {
			$uibModalInstance.dismiss('cancel');
		});
	}

	var vm = this;
	vm.cancel = cancel;
	vm.ok = ok;
});
