'use strict';
angular
	.module('softvApp')
	.controller('ModalEdoCuentaCtrl', function($uibModalInstance, cajasFactory, contrato, $sce) {
		this.$onInit = function() {
			vm.url = 'http://172.16.126.41/exes/EdoCuentaClientes' + contrato + '.pdf';
			vm.urlReal = $sce.trustAsResourceUrl(vm.url);
			console.log(vm.urlReal);
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
	});
