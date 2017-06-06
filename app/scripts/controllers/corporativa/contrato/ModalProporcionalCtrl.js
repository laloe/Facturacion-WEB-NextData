'use strict';
angular
	.module('softvApp')
	.controller('ModalProporcionalCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify ,contrato) {
		this.$onInit = function() {
       
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
			contrato.Proporcional=false;
			$rootScope.$emit('contrato_proporcional', contrato);
		}

        function ok(){
            $uibModalInstance.dismiss('cancel');
			contrato.Proporcional=true;
			$rootScope.$emit('contrato_proporcional', contrato);
        }

		var vm = this;
		vm.cancel = cancel;
        vm.ok=ok;
	});
