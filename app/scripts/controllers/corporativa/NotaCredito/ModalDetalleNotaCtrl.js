(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalDetalleNotaCtrl', ModalDetalleNotaCtrl);

  ModalDetalleNotaCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'nota', 'ngNotify', 'ContratoMaestroFactory'];

  function ModalDetalleNotaCtrl($uibModalInstance, $uibModal, $rootScope, nota, ngNotify, ContratoMaestroFactory) {
    var vm = this;
    vm.nota = nota;
    vm.cancel = cancel;

    this.$onInit = function () {
      ContratoMaestroFactory.GetNotasDeCredito_ContraMaeFacList(nota).then(function (data) {
        vm.detalle = data.GetNotasDeCredito_ContraMaeFacListResult[0];
        vm.ticket = vm.detalle.Ticket;
        vm.caja = vm.detalle.CajaNom;
        vm.cajero = vm.detalle.Cajero
        vm.usuario = vm.detalle.Usuario_Captura;
        vm.fechag = vm.detalle.Fecha_deGeneracion;
        vm.fechac = vm.detalle.Fecha_Caducidad;
        vm.obs = vm.detalle.Observaciones;
        vm.sumatotal = vm.detalle.Monto;
        vm.ContratoMaestro = vm.detalle.ContratoMaestro;
        var parametros = {
          'RazonSocial': '',
          'NombreComercial': '',
          'ClvCiudad': vm.ContratoMaestro,
          'Op': 4
        };

        ContratoMaestroFactory.BuscarContratos(parametros).then(function (data) {
          vm.DetalleContrato = data.GetBusquedaContratoMaestroFacResult[0];
          console.log(data);
          ContratoMaestroFactory.GetDetalle_NotasdeCreditoVerHistorialList(vm.nota).then(function (data) {
           console.log(data);
            vm.DetalleNota = data.GetDetalle_NotasdeCreditoVerHistorialListResult;
          });
        });
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();
