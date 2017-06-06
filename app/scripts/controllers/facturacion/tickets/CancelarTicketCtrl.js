'use strict';
angular.module('softvApp')
	.controller('cancelarTicketCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, item) {
		function initialData() {
			vm.conFolio = item.Serie + '-' + item.Folio;
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {
			item.op = 0;
			$uibModalInstance.dismiss('cancel');
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalmotivoTicket.html',
				controller: 'MotivoTicketCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					item: function() {
						return item;
					}
				}
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		vm.mensaje='¿Deseas Cancelar el TICKET DE CAJA:';
		vm.titulo='Cancelación de tickets';
		initialData();
	});
