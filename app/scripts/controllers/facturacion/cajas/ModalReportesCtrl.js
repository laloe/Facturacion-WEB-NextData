'user strict';
angular
	.module('softvApp')
	.controller('ModalReportesCtrl', function($uibModal, $uibModalInstance, cajasFactory, contrato) {

		function initialData() {
			cajasFactory.dameServiciosCliente().then(function(data) {
				vm.serviciosCliente = data.GetMuestraTipSerPrincipalListResult;
				vm.selectServicio = data.GetMuestraTipSerPrincipalListResult[0];
				getReportes();
			});
		}

		function getReportes() {
			cajasFactory.dameHistorialQuejas(contrato, vm.selectStatus, vm.selectServicio.Clv_TipSerPrincipal).then(function(data) {
				if (data.GetBuscaQuejasLListResult.length == 0) {
					vm.sinDatos = true;
					vm.reportes = '';
				} else {
					vm.sinDatos = false;
					vm.reportes = data.GetBuscaQuejasLListResult;
				}
			});
		}

		function singleQueja(clave) {
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalSingleQueja.html',
				controller: 'ModalSingleQuejaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				windowClass: 'app-modal-window',
				resolve: {
					clave: function() {
						return clave;
					}
				}
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		initialData();
		vm.selectStatus = 'E';
		vm.singleQueja = singleQueja;
		vm.changeSelect = getReportes;

	});
