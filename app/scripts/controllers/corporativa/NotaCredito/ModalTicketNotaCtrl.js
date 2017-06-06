(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalTicketNotaCtrl', ModalTicketNotaCtrl);

  ModalTicketNotaCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', 'factura'];
  function ModalTicketNotaCtrl($uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory, object) {
    var vm = this;
    vm.cancel = cancel;
    vm.printDiv = printDiv;

    this.$onInit = function () {
      vm.cmaestro=object.contrato;
      ContratoMaestroFactory.GetCrearNotaCreditoCM(object.factura).then(function (response) {
        vm.det = response.GetCrearNotaCreditoCMResult[0];
        ContratoMaestroFactory.ConceptosTicketNotasCredito(object.factura).then(function (data) {
          console.log(data);
          vm.conceptos = data.GetConceptosTicketNotasCreditoCMResult;           

          vm.total=0;
          for(var a=0; a<vm.conceptos.length; a++){
            if(vm.conceptos[a].Se_Cobra==true){
             vm.total+=vm.conceptos[a].importe;
            }
            
          }
        });
      });
    }

    function printDiv(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=1000,height=700');
      popupWin.document.open();
      popupWin.document.write('<html><head><link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();