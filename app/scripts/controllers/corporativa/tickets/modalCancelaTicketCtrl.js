'use strict';
angular
  .module('softvApp')
  .controller('modalCancelaTicketCtrl', function ($uibModalInstance, $uibModal, ContratoMaestroFactory, ngNotify, $rootScope, ticket) {
    this.$onInit = function () {
      vm.conFolio = ticket.Ticket;
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {

      ContratoMaestroFactory.ValidaCancelacionFactura(ticket.Clv_FacturaMaestro).then(function (data) {
        if (data.GetValidaCancelacionFacturaCMResult[0].Res == 1) {
          ngNotify.set(data.GetValidaCancelacionFacturaCMResult[0].Msg, "error");
        } else {
          $uibModalInstance.dismiss('cancel');
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/corporativa/modalMotivoCanMaestro.html',
            controller: 'modalMotivoCanMaestroCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            class: 'modal-backdrop fade',
            size: 'md',
            resolve: {
              ticket: function () {
                return ticket;
              }
            }
          });
        }

      });


    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.mensaje='¿Deseas cancelar la factura';
    vm.titulo='Cancelación de Facturas';
  });
