'use strict';
angular
	.module('softvApp')
	.controller('RolCtrl', function($state, rolFactory, globalService, $uibModal) {
		function openEditRol(x) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/configuracion/modalAddRol.html',
				controller: 'ModalAddRolCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					Rol: x
				}

			});
		}


		function GetRolList() {
			rolFactory.GetRolList().then(function(data) {
				if (data.GetRolListResult.length > 0) {
					vm.sinDatos = false;
					vm.showPaginator = true;
				} else {
					vm.sinDatos = true;
					vm.showPaginator = false;
				}
				vm.Roles = data.GetRolListResult;
			});
		}
		var vm = this;
		vm.sinDatos = false;
		vm.showPaginator = false;
		GetRolList();

	});
