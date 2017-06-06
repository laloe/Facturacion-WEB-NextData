(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ticketsCorporativaCtrl', ticketsCtrl);

  ticketsCtrl.inject = [''];

  function ticketsCtrl(ContratoMaestroFactory, $filter, $uibModal,ngNotify,$rootScope) {

    function Init() {
      Buscar(0);
    }

    function Buscar(opc) {

      var parametros = {};

      if (opc == 1) {
        parametros = {
          'Fecha': $filter('date')(vm.fecha, 'dd/MM/yyyy'),
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': 1,
          'Saldada': 0
        };

      } else if (opc == 2) {
        parametros = {
          'Fecha': '',
          'Ticket': vm.folio,
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': 2,
          'Saldada': 0
        };


      } else if (opc == 3) {

        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': vm.contrato,
          'Cliente': '',
          'Op': 3,
          'Saldada': 0
        };

      } else if (opc == 4) {

        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': vm.cliente,
          'Op': 4,
          'Saldada': 0
        };

      } else {

        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': 0,
          'Saldada': 0
        };
      }
     
      ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {       
        vm.Tickets = data.GetBuscaFacturasMaestroListResult;
      });
    }

    function opcionTicket(opc, ticket) {
      if (opc == 1) {
        ticket.op = 'PRINT';

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

      } else if (opc == 3) {

        ContratoMaestroFactory.TblFacturasOpcionesCM(ticket.Clv_FacturaMaestro, 0, 0,1).then(function (data) {
          ngNotify.set("El email se ha enviado  exitosamente")
        });
      } else {

        ticket.op = 'CAN';
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/facturacion/modalCancelarTicket.html',
          controller: 'modalCancelaTicketCtrl',
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


    }

    $rootScope.$on('reload_tabla', function () {
    Buscar(0);
  });


    var vm = this;
    vm.Buscar = Buscar;
    Init();
    vm.opcionTicket = opcionTicket;
  }
})();
