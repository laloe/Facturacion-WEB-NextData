(function () {
	'use strict';

	angular
		.module('softvApp')
		.controller('ModalAgregarServicioCtrl', ModalAgregarServicioCtrl);

	ModalAgregarServicioCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope'];
	function ModalAgregarServicioCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope) {
		var vm = this;
		vm.cancel = cancel;
		vm.guardaDetalle = guardaDetalle;
		vm.changeTrabajo = changeTrabajo;
		vm.realizar = true;

		this.$onInit = function () {
			ordenesFactory.dimeServicio(items.contrato).then(function (data) {
				vm.servicios = data.GetDime_Que_servicio_Tiene_clienteListResult;
			});
		}

		function changeTrabajo() {
			ordenesFactory.muestraTrabajo(vm.selectedServicio.clv_tipser).then(function (data) {
				vm.tipoTrabajo = data.GetMUESTRATRABAJOSPorTipoUsuarioListResult;
			});
		}

		function guardaDetalle() {
			ordenesFactory.validaOrden(items.contrato, vm.selectedTrabajo.Clv_Trabajo).then(function (data) {
				if (data.GetDeepVALIDAOrdenQuejaResult.Msg != null) {
					ngNotify.set(data.GetDeepVALIDAOrdenQuejaResult.Msg, 'info');
				} else {
					var realiza = 0;
					if (vm.realizar) {
						realiza = 1;
					}
					var detalle = {
						clave: items.clv_orden,
						trabajo: vm.selectedTrabajo.Clv_Trabajo,
						observaciones: vm.observaciones,
						SeRealiza: realiza
					};
					ordenesFactory.addDetalleOrden(detalle).then(function (data) {
						vm.clv_detalle_orden = data.AddDetOrdSerResult;
						$rootScope.$emit('detalle_orden', vm.clv_detalle_orden);
						if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('bcabm')) {
							ngNotify.set('La baja de cablemodem se genera de forma automática en el momento que todos los servicios pasen a baja.', 'info');
						}
						else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('bapar')) {
							ngNotify.set('La baja de aparato digital se genera de forma automática en el momento que todos los servicios pasen a baja.', 'info');
						}
						else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('camdo') || vm.selectedTrabajo.Descripcion.toLowerCase().includes('cadig') || vm.selectedTrabajo.Descripcion.toLowerCase().includes('canet')) {
							items.clv_detalle_orden = vm.clv_detalle_orden;
							items.isUpdate = false;
							var modalInstance = $uibModal.open({
								animation: true,
								ariaLabelledBy: 'modal-title',
								ariaDescribedBy: 'modal-body',
								templateUrl: 'views/facturacion/modalCambioDomicilio.html',
								controller: 'CambioDomicilioOrdenesCtrl',
								controllerAs: 'ctrl',
								backdrop: 'static',
								keyboard: false,
								size: 'md',
								resolve: {
									items: function () {
										return items;
									}
								}
							});
						}
						else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('ipaqu')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('bpaqu')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('dpaqu')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('rpaqu')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('ipaqut')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('bpaqt')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('dpaqt')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('rpaqt')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('bpaad')
							|| vm.selectedTrabajo.Descripcion.toLowerCase().includes('bsedi')) {
							items.clv_detalle_orden = vm.clv_detalle_orden;
							items.descripcion = vm.selectedTrabajo.Descripcion.toLowerCase();
							items.servicio = vm.selectedServicio;
							var modalInstance = $uibModal.open({
								animation: true,
								ariaLabelledBy: 'modal-title',
								ariaDescribedBy: 'modal-body',
								templateUrl: 'views/procesos/bajaServicios.html',
								controller: 'BajaServiciosCtrl',
								controllerAs: 'ctrl',
								backdrop: 'static',
								keyboard: false,
								size: 'md',
								resolve: {
									items: function () {
										return items;
									}
								}
							});
						}
						$uibModalInstance.dismiss('cancel');
					});
				}
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();