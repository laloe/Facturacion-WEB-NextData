    'use strict';
    angular
    	.module('softvApp')
    	.controller('ModalDescargaMaterialCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state) {

    		function initialData() {

    		}

    		function ok() {

    		}



    		function cancel() {
    			$uibModalInstance.dismiss('cancel');
    		}

    		var vm = this;
    		vm.cancel = cancel;
    		vm.ok = ok;
    		initialData();
    	});
