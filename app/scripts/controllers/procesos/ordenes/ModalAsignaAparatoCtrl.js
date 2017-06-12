(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalAsignaAparatoCtrl', ModalAsignaAparatoCtrl);

  ModalAsignaAparatoCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope', 'ngNotify'];

  function ModalAsignaAparatoCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope, ngNotify, $localStorage) {
    var vm = this;
    vm.cancel = cancel;
    vm.guardar = guardar;


    this.$onInit = function () {


      var Parametros = {
        'Op': items.Op,
        'Trabajo': items.Trabajo,
        'Contrato': items.Contrato,
        'ClvTecnico': items.ClvTecnico,
        'Clave': items.Clave
      };

      ordenesFactory.MUESTRAAPARATOS_DISCPONIBLES(Parametros).then(function (resp) {
        vm.aparatos = resp.GetMUESTRAAPARATOS_DISCPONIBLESListResult;
      });

    }

    function guardar() {

      var obj = {
        'Clave': 0,
        'Trabajo': items.Trabajo,
        'ClvOrden': items.Clave,
        'ContratoNet': vm.aparato.ContratoAnt,
        'ClvAparato': 0,
        'Op': 0,
        'Status': 'I'
      }
      
      ordenesFactory.AddSP_GuardaIAPARATOS(obj).then(function (data) {
        $rootScope.$emit('actualiza_tablaServicios');
         $uibModalInstance.dismiss('cancel');
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
