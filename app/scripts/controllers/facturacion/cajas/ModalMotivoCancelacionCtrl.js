'use strict';
angular
	.module('softvApp')
	.controller('ModalMotivoCancelacionCtrl', function($uibModalInstance, cajasFactory, items, $rootScope) {

		function initialData() {
			cajasFactory.montCantList().then(function(data) {
				vm.motivos = data.GetMotCanListResult;
				vm.selectedMotivo = data.GetMotCanListResult[0];
			});
		}

		function cancel() {
			cajasFactory.motivoCancelar(items.Session).then(function(data) {
				$uibModalInstance.dismiss('cancel');
			});
		}

		function ok() {
			cajasFactory.checarServicios(items.Contrato, items.Session, vm.selectedMotivo.Clv_MOTCAN, items.CLV_DETALLE).then(function(data) {
				if (data.GetDeepChecarServiciosCanceladosResult.Valor == true) {
					cajasFactory.cobrarBaja(items.Contrato, items.Session, vm.selectedMotivo.Clv_MOTCAN).then(function(data) {
						$uibModalInstance.dismiss('cancel');
						$rootScope.$emit('realoadPagos', {});
					});
				} else {
					cajasFactory.preCobraAdeudo(items.Session, items.CLV_DETALLE, vm.selectedMotivo.Clv_MOTCAN).then(function(data) {
						$uibModalInstance.dismiss('cancel');
						$rootScope.$emit('realoadPagos', {});
					});
				}
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
