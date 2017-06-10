(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalAsignaAparatoCtrl', ModalAsignaAparatoCtrl);

  ModalAsignaAparatoCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope', 'ngNotify'];

  function ModalAsignaAparatoCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope, ngNotify, $localStorage) {
    var vm = this;
    vm.cancel = cancel;
    vm.guardar=guardar;


    this.$onInit = function () {
     

      var Parametros = {
        'Op': items.Op,
        'Trabajo': items.Trabajo,
        'Contrato': items.Contrato,
        'ClvTecnico': items.ClvTecnico,
        'Clave': items.Clave
      };

      ordenesFactory.MUESTRAAPARATOS_DISCPONIBLES(Parametros).then(function (resp) {
        console.log(resp);
      });

    }

    function guardar(){

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
