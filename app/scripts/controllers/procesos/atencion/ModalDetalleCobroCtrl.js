'use strict';
angular
	.module('softvApp')
	.controller('ModalDetalleCobroCtrl', function($uibModalInstance, $uibModal, cajasFactory, contrato, atencionFactory, $rootScope, ngNotify, $localStorage) {
		function initialData() {
			cajasFactory.dameSession(contrato).then(function(session) {
				vm.session = session.GetDeepDameClv_SessionResult.IdSession;
				cajasFactory.dameDetallePago(vm.session).then(function(detallePago) {
					vm.detallePago = detallePago.GetDameDetalleListResult;
					vm.detallePagoAux = vm.detallePago;
					cajasFactory.dameSumaPago(vm.session).then(function(sumaPago) {
						vm.sumaPagos = sumaPago.GetSumaDetalleListResult;
					});
				});
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
		var vm = this;
		vm.cancel = cancel;
		initialData();

	});
