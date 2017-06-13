(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('modalMotivoCanCtrl', modalMotivoCanCtrl);

  modalMotivoCanCtrl.inject = ['$uibModalInstance', '$uibModal', 'ContratoMaestroFactory', 'ngNotify', '$rootScope', 'ticket'];

  function modalMotivoCanCtrl($uibModalInstance, $uibModal, ordenesFactory, ngNotify, $rootScope) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;


    this.$onInit = function () {

      ordenesFactory.GetConMotCanList().then(function (response) {
       console.log(response);
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {

    }
  }
})();
