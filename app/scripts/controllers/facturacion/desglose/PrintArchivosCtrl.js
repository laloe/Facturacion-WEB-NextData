'use strict';
angular.module('softvApp').controller('PrintArchivosCtrl', PrintArchivosCtrl);

function PrintArchivosCtrl($uibModalInstance, items, $sce) {
	var vm = this;
	vm.cancel = cancel;

	this.$onInit = function() {
		vm.url = $sce.trustAsResourceUrl(items.url);
		vm.titulo = items.titulo;
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}
