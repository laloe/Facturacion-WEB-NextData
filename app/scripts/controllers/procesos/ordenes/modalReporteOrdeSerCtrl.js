(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('modalReporteOrdeSerCtrl', modalReporteOrdeSerCtrl);

  modalReporteOrdeSerCtrl.inject = ['$uibModalInstance', '$uibModal', 'ContratoMaestroFactory', 'ngNotify', '$rootScope', 'clv_orden', '$sce', 'globalService'];

  function modalReporteOrdeSerCtrl($uibModalInstance, $uibModal, ordenesFactory, ngNotify, $rootScope, $sce, globalService, clv_orden) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;


    this.$onInit = function () {
      var obj = {
        'Clv_TipSer': 0,
        'op1': 1,
        'op2': 0,
        'op3': 0,
        'op4': 0,
        'op5': 0,
        'StatusPen': 0,
        'StatusEje': 0,
        'StatusVis': 0,
        'Clv_OrdenIni': clv_orden,
        'Clv_OrdenFin': clv_orden,
        'Fec1Ini': '',
        'Fec1Fin': '',
        'Fec2Ini': '',
        'Fec2Fin': '',
        'Clv_Trabajo': 0,
        'Clv_Colonia': 0,
        'OpOrden': 0,
        'IdCompania': 0,
        'clv_ciudad': 0,
        'clv_usuario': 0
      }


      ordenesFactory.GetReporteOrdenServicio(obj).then(function (resp) {
          console.log(resp);
        var id = resp.GetReporteOrdenServicioResult;
        vm.url = globalService.getUrlReportes() + '/Reportes/' + id;
        vm.urlReal = $sce.trustAsResourceUrl(vm.url);
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {

    }
  }
})();
