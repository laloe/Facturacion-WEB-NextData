(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('nuevaNotaCreditoCtrl', nuevaNotaCreditoCtrl);

  nuevaNotaCreditoCtrl.inject = ['$uibModal', '$state', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', '$localStorage', '$filter', ' $scope'];

  function nuevaNotaCreditoCtrl($uibModal, $state, $rootScope, ngNotify, ContratoMaestroFactory, $localStorage, $filter, $scope) {
    var vm = this;
    vm.abrirContratos = abrirContratos;
    vm.cambioFactura = cambioFactura;
    vm.MuestraDet = false;
    vm.enter = enter;
    vm.bloquear = false;
    vm.date = new Date();
    vm.FechaG = $filter('date')(vm.date, 'dd/MM/yyyy');
    vm.FechaC = $filter('date')(vm.date, 'dd/MM/yyyy');
    vm.calcular = calcular
    vm.guardar = guardar;
    vm.sumatotal = 0;
    vm.abrirTicket = abrirTicket;
    vm.mostrarbtn = true;
    vm.clvnota = 0;
    vm.revertir = false;
    vm.Detallefactura = Detallefactura;
    vm.MarcarContratos = MarcarContratos;
    vm.marcar = true;

    this.$onInit = function () {
      ContratoMaestroFactory.StatusNotadeCredito().then(function (data) {
        vm.StatusList = data.GetStatusNotadeCreditoListResult;
        vm.StatusList.Clv_Status = "A";
      });
    }

    function abrirTicket(factura, contrato) {
      var object = {};
      object.factura = factura;
      object.contrato = contrato;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalTicketNota.html',
        controller: 'ModalTicketNotaCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "sm",
        resolve: {
          object: function () {
            return object;
          }
        }
      });
    }

    function revertir(clvnota) {
      var options = {};
      options.clvnota = clvnota;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/modalRevertirProceso.html',
        controller: 'modalRevertirProcesoCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "md",
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }



    function abrirContratos() {

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalBuscaContratoMaestro.html',
        controller: 'ModalBusquedaCMCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "lg",
        resolve: {}
      });
    }

    $rootScope.$on('actualiza_detalle', function (e, obj) {

      ContratoMaestroFactory.GetDetalle_NotasdeCreditoList(obj.clv_session).then(function (data) {
        vm.DetalleNota = data.GetDetalle_NotasdeCreditoListResult;
        calcular();
      });
      ContratoMaestroFactory.GetCalcula_monto(vm.factura.CLV_FACTURA).then(function (data) {
        vm.Monto = data.GetCalcula_montoResult.Monto;

      });

    });

    $scope.$on('verticket', function (e, contrato) {
      abrirTicket(vm.Clv_NotadeCredito, vm.Contrato);
    });

    $rootScope.$on('contrato_nota', function (e, contrato) {
      vm.DetalleContrato = contrato;
      vm.Contrato = contrato.IdContratoMaestro;
      vm.MuestraDet = true;
      vm.DetalleNota = [];
      vm.Caja = '';
      vm.NSucursal = '';
      vm.Cajero = [];
      vm.contratos = [];
      vm.sumatotal = 0;
      vm.usuario = $localStorage.currentUser.usuario
      facturas(vm.Contrato);
    });

    function facturas(contrato) {
      ContratoMaestroFactory.DAME_FACTURASDECLIENTE(contrato).then(function (data) {
        vm.facturas = data.GetDAME_FACTURASDECLIENTEListResult;

      });
    }

    function enter(keyEvent) {

      if (keyEvent.which === 13) {
        keyEvent.preventDefault();
        if (vm.Contrato > 0) {
          var parametros = {
            'RazonSocial': '',
            'NombreComercial': '',
            'ClvCiudad': vm.Contrato,
            'Op': 4
          };
          ContratoMaestroFactory.BuscarContratos(parametros).then(function (data) {
            if (data.GetBusquedaContratoMaestroFacResult.length > 0) {
              vm.DetalleContrato = data.GetBusquedaContratoMaestroFacResult[0];
              vm.Contrato = data.GetBusquedaContratoMaestroFacResult[0].IdContratoMaestro;
              vm.MuestraDet = true;
              vm.DetalleNota = [];
              vm.Caja = '';
              vm.NSucursal = '';
              vm.Cajero = [];
              vm.contratos = [];
              vm.sumatotal = 0;
              vm.usuario = $localStorage.currentUser.usuario
              facturas(vm.Contrato);

            } else {
              ngNotify.set('No se encontró un contrato  con la clave proporcionada', 'error');
            }
          });
        } else {
          ngNotify.set('Ingresa un contrato válido', 'error');
        }


      }

    }


    function Detallefactura(obj) {
      var options = {};
      options.clv_session = vm.clv_session;
      options.Clv_FacturaCli = obj.Clv_FacturaCli;
      options.contratocom = obj.ContratoCompuesto;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalDetalleFacCli.html',
        controller: 'ModalDetalleFacCliCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "md",
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }

    function MarcarContratos() {

      if (vm.marcar == true) {
        ContratoMaestroFactory.UpdateMarcaTodoNotaCreditoCM(vm.clv_session).then(function (response) {
          ContratoMaestroFactory.DetalleContratosFM(vm.factura.CLV_FACTURA).then(function (result) {


            vm.contratos = result.GetDetalleContratosFMListResult.ListaUno;
            ContratoMaestroFactory.GetDetalle_NotasdeCreditoList(vm.clv_session).then(function (data) {
              vm.DetalleNota = data.GetDetalle_NotasdeCreditoListResult;
              calcular();
            });
            ContratoMaestroFactory.GetCalcula_monto(vm.factura.CLV_FACTURA).then(function (data) {

              vm.Monto = data.GetCalcula_montoResult.Monto;

            });

          });

        })
      } else {
        ContratoMaestroFactory.UpdateDesmarcaTodoNotaCreditoCM(vm.clv_session).then(function (response) {
          ContratoMaestroFactory.DetalleContratosFM(vm.factura.CLV_FACTURA).then(function (result) {


            vm.contratos = result.GetDetalleContratosFMListResult.ListaUno;
            ContratoMaestroFactory.GetDetalle_NotasdeCreditoList(vm.clv_session).then(function (data) {
              vm.DetalleNota = data.GetDetalle_NotasdeCreditoListResult;
              calcular();
            });
            ContratoMaestroFactory.GetCalcula_monto(vm.factura.CLV_FACTURA).then(function (data) {

              vm.Monto = data.GetCalcula_montoResult.Monto;

            });

          });

        })

      }
    }


    function cambioFactura() {
      ContratoMaestroFactory.GetObtieneDatosTicketList(vm.factura.CLV_FACTURA).then(function (data) {
        vm.Caja = data.GetObtieneDatosTicketListResult.Caja[0].NOMBRE;
        vm.clvcaja = data.GetObtieneDatosTicketListResult.Caja[0].CLV_USUARIO
        vm.Sucursal = data.GetObtieneDatosTicketListResult.Sucursal[0];
        vm.NSucursal = data.GetObtieneDatosTicketListResult.Sucursal[0].NOMBRE;
        vm.Cajero = data.GetObtieneDatosTicketListResult.Cajero;
        vm.usuario = $localStorage.currentUser.usuario


        ContratoMaestroFactory.DetalleContratosFM(vm.factura.CLV_FACTURA).then(function (result) {

          vm.clv_session = result.GetDetalleContratosFMListResult.ListaDos[0].Clv_Session;
          vm.contratos = result.GetDetalleContratosFMListResult.ListaUno;
          ContratoMaestroFactory.GetDetalle_NotasdeCreditoList(vm.clv_session).then(function (data) {
            vm.DetalleNota = data.GetDetalle_NotasdeCreditoListResult;
            calcular();
          });
          ContratoMaestroFactory.GetCalcula_monto(vm.factura.CLV_FACTURA).then(function (data) {

            vm.Monto = data.GetCalcula_montoResult.Monto;

          });

        });





      });

    }

    function guardar() {
      if (vm.sumatotal == 0) {
        ngNotify.set('No puede guardar una nota de crédito con un monto $0.00 ', 'error');
        return;
      }

      
      
      var obj = {
        'ContratoMaestro': vm.Contrato,
        'Factura': vm.factura.CLV_FACTURA,
        'Fecha_deGeneracion': vm.FechaG,
        'Usuario_Captura': $localStorage.currentUser.usuario,
        'Usuario_Autorizo': $localStorage.currentUser.idUsuario,
        'Fecha_Caducidad': vm.FechaC,
        'Monto': vm.sumatotal,
        'Status': "A",
        'Observaciones': vm.Observaciones,
        'Clv_Sucursal': $localStorage.currentUser.sucursal,
        'Clv_suc_aplica': $localStorage.currentUser.sucursal,
        'Tipo': 0,
        'Caja': vm.clvcaja,
        'Contrato_Aplicar': 0,
      }


      ContratoMaestroFactory.GetAddNotaCredito(obj).then(function (data) {
        vm.Clv_NotadeCredito = data.GetAddNotaCreditoResult[0].Clv_NotadeCredito;

        ContratoMaestroFactory.GetGuarda_DetalleNota(vm.clv_session, vm.Clv_NotadeCredito).then(function (data) {
          ngNotify.set('La nota de crédito se ha guardado correctamente', 'success');

          ContratoMaestroFactory.AddMovSist(vm.Contrato, vm.sumatotal).then(function (data) {
            ContratoMaestroFactory.DeleteNotasDeCredito_ContraMaeFac(vm.factura.CLV_FACTURA, vm.Clv_NotadeCredito)
              .then(function (data) {});
          });
        });
        vm.mostrarbtn = false;
        vm.clvnota = vm.Clv_NotadeCredito;

        revertir(vm.Clv_NotadeCredito);


      });

    }

    function calcular() {
      vm.sumatotal = 0;
      vm.DetalleNota.forEach(function (element) {

        vm.sumatotal += (element.importe == undefined) ? 0 : element.importe
      });
    }

  }
})();
