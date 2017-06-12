(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalAgregarServicioCtrl', ModalAgregarServicioCtrl);

  ModalAgregarServicioCtrl.inject = ['$uibModal', '$uibModalInstance', 'ordenesFactory', 'items', '$rootScope', 'ngNotify'];

  function ModalAgregarServicioCtrl($uibModal, $uibModalInstance, ordenesFactory, items, $rootScope, ngNotify, $localStorage) {
    var vm = this;
    vm.cancel = cancel;
    vm.guardaDetalle = guardaDetalle;
    vm.changeTrabajo = changeTrabajo;
    vm.realizar = true;

    this.$onInit = function () {
      ordenesFactory.dimeServicio(items.contrato).then(function (data) {
        vm.servicios = data.GetDime_Que_servicio_Tiene_clienteListResult;
      });
    }

    function changeTrabajo() {
      console.log(vm.selectedServicio.clv_tipser, $localStorage.currentUser.tipoUsuario);
      ordenesFactory.muestraTrabajo(vm.selectedServicio.clv_tipser, $localStorage.currentUser.tipoUsuario).then(function (data) {
        vm.tipoTrabajo = data.GetMUESTRATRABAJOSPorTipoUsuarioListResult;
      });
    }

    function guardaDetalle() {
      ordenesFactory.validaOrden(items.contrato, vm.selectedTrabajo.Clv_Trabajo).then(function (data) {
        if (data.GetDeepVALIDAOrdenQuejaResult.Msg != null) {
          ngNotify.set(data.GetDeepVALIDAOrdenQuejaResult.Msg, 'info');
        } else {
          var realiza = 0;
          if (vm.realizar) {
            realiza = 1;
          }
          var detalle = {
            clave: items.clv_orden,
            trabajo: vm.selectedTrabajo.Clv_Trabajo,
            observaciones: vm.observaciones,
            SeRealiza: realiza
          };
          console.log(detalle);
          ordenesFactory.addDetalleOrden(detalle).then(function (data) {
            vm.clv_detalle_orden = data.AddDetOrdSerResult;

            $rootScope.$emit('detalle_orden', vm.clv_detalle_orden);
            if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('bcabm')) {
              ngNotify.set('La baja de cablemodem se genera de forma automática en el momento que todos los servicios pasen a baja.', 'info');
            } else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('bapar')) {
              ngNotify.set('La baja de aparato digital se genera de forma automática en el momento que todos los servicios pasen a baja.', 'info');
            } else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('camdo') || vm.selectedTrabajo.Descripcion.toLowerCase().includes('cadig') || vm.selectedTrabajo.Descripcion.toLowerCase().includes('canet')) {
              items.clv_detalle_orden = vm.clv_detalle_orden;
              items.isUpdate = false;
              var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/facturacion/modalCambioDomicilio.html',
                controller: 'CambioDomicilioOrdenesCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                size: 'md',
                resolve: {
                  items: function () {
                    return items;
                  }
                }
              });
            } else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('ipaqu') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('bpaqu') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('dpaqu') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rpaqu') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('ipaqut') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('bpaqt') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('dpaqt') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rpaqt') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('bpaad') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('bsedi')) {
              items.clv_detalle_orden = vm.clv_detalle_orden;
              items.descripcion = vm.selectedTrabajo.Descripcion.toLowerCase();
              items.servicio = vm.selectedServicio;
              var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/procesos/bajaServicios.html',
                controller: 'BajaServiciosCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                size: 'md',
                resolve: {
                  items: function () {
                    return items;
                  }
                }
              });
            } else if (
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('iante') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('inlnb') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('iapar') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('riapar') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('iantx') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('iradi') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('irout') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('icabm') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('ecabl') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('econt') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rante') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('relnb') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rcabl') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rcont') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rapar') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rantx') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('retca') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rradi') ||
              vm.selectedTrabajo.Descripcion.toLowerCase().includes('rrout')
            ) {
              vm.NOM = vm.selectedTrabajo.Descripcion.split(' ');
              alert('abre modal');
              var items_ = {
                'Op': 'N',
                'Trabajo': vm.NOM[0],
                'Contrato': items.contrato,
                'ClvTecnico': items.clv_tecnico,
                'Clave': items.clv_orden
              };

              var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/procesos/ModalAsignaAparato.html',
                controller: 'ModalAsignaAparatoCtrl',
                controllerAs: 'ctrl',
                backdrop: 'static',
                keyboard: false,
                size: 'md',
                resolve: {
                  items: function () {
                    return items_;
                  }
                }
              });


            } else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('canex')) {
              console.log('canex');
            } else if (vm.selectedTrabajo.Descripcion.toLowerCase().includes('ecabl') || vm.selectedTrabajo.Descripcion.toLowerCase().includes('econt')) {
              console.log('ecotl');
            } else {


              $rootScope.$emit('actualiza_tablaServicios');

            }



            $uibModalInstance.dismiss('cancel');
          });
        }
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
