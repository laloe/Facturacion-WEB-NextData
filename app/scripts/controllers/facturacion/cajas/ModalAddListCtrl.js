'use strict';
angular
	.module('softvApp')
	.controller('ModalAddListCtrl', function($uibModalInstance, $uibModal, items, cajasFactory, $rootScope, ngNotify) {

		function initialData() {
			cajasFactory.muestraServicios(items.Contrato).then(function(data) {
				data.GetMuestraServiciosFACListResult.unshift({
					'DescripcionFac': '----------------',
					'Clv_Servicio': 0
				});
				vm.servicios = data.GetMuestraServiciosFACListResult;
				vm.selectedService = data.GetMuestraServiciosFACListResult[0];
			});
		}

		function ok() {
			if (vm.selectedService.Clv_Servicio == 0) {
				ngNotify.set('Selecciona un servicio por favor.', 'error');
			} else {
				if (vm.selectedService.Clv_Txt == 'CADIG' || vm.selectedService.Clv_Txt == 'CADI2' || vm.selectedService.Clv_Txt == 'CADI3' || vm.selectedService.Clv_Txt == 'CANET') {
					cajasFactory.consultaCamdo(items.Session, items.Contrato).then(function(data) {
						if (data.GetCAMDOFACResult.Existe == false) {
							$uibModalInstance.dismiss('cancel');
							items.Texto = vm.selectedService.Clv_Txt;
							vm.animationsEnabled = true;
							var modalInstance = $uibModal.open({
								animation: vm.animationsEnabled,
								ariaLabelledBy: 'modal-title',
								ariaDescribedBy: 'modal-body',
								templateUrl: 'views/facturacion/modalCambioDomicilio.html',
								controller: 'ModalCambioDomicilioCtrl',
								controllerAs: 'ctrl',
								backdrop: 'static',
								keyboard: false,
								size: 'md',
								resolve: {
									items: function() {
										return items;
									}
								}
							});
						} else {
							ngNotify.set('El cliente tiene un cambio de domicilio pendiente.', 'error');
						}
					});
				} else {
					cajasFactory.addAdicionales(items.Session, vm.selectedService.Clv_Txt, items.Contrato, items.Tipo).then(function(data) {
						$uibModalInstance.dismiss('cancel');
						$rootScope.$emit('realoadPagos', {});
					});
				}
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
