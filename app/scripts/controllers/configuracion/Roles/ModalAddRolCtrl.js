'user strict';
angular.module('softvApp')
	.controller('ModalAddRolCtrl', function($uibModalInstance, rolFactory, $rootScope) {
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function Guarda() {
			var nombre = vm.Nombre;
			var status = vm.Status;
			rolFactory.AddRol(nombre, status);
		}
		var vm = this;
		vm.cancel = cancel;
		vm.Guarda = Guarda;
	});
