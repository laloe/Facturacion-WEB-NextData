(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('notaCreditoCtrl', notaCreditoCtrl);

  notaCreditoCtrl.inject = ['$uibModal', '$state', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', '$filter'];
  function notaCreditoCtrl($uibModal, $state, $rootScope, ngNotify, ContratoMaestroFactory, $filter) {
    var vm = this;
    vm.buscar = buscar;
    vm.DetalleNota = DetalleNota;
    vm.opcionesNota = opcionesNota;



    this.$onInit = function () {
      buscar(0);
    }

    function buscar(id) {

      if (id == 1) {
        var parametros = {
          'Op': 1,
          'Clv_NotadeCredito': vm.folio,
          'Fecha': '',
          'ContratoMaestro': 0
        }

      } else if (id == 2) {

        var parametros = {
          'Op': 3,
          'Clv_NotadeCredito': 0,
          'Fecha': '',
          'ContratoMaestro': vm.contrato
        }
      } else if (id == 3) {
        var parametros = {
          'Op': 2,
          'Clv_NotadeCredito': 0,
          'Fecha': vm.fecha = $filter('date')(vm.date, 'dd/MM/yyyy'),
          'ContratoMaestro': 0
        }


      } else {
        var parametros = {
          'Op': 0,
          'Clv_NotadeCredito': 0,
          'Fecha': '',
          'ContratoMaestro': 0
        }
      }

      ContratoMaestroFactory.FiltrosBusquedaNotasDeCredito(parametros).then(function (data) {
        vm.Notas = data.GetBusquedaNotasListResult;
      });
    }

    function DetalleNota(nota) {

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalDetalleNota.html',
        controller: 'ModalDetalleNotaCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "lg",
        resolve: {
          nota: function () {
            return nota;
          }
        }
      });
    }



 


    function opcionesNota(opcion, nota) {
      if (opcion == 1) {
        ContratoMaestroFactory.TblNotasMaestraOpciones(nota, 0, 1, 0).then(function (data) {
          ngNotify.set('La nota se ha refacturado correctamente.', 'success');
        });

      } else if (opcion == 2) {
        ContratoMaestroFactory.TblNotasMaestraOpciones(nota, 0, 0, 1).then(function (data) {
          ngNotify.set('La nota se ha reimpreso correctamente.', 'success');
        });

      }
    }

  }
})();