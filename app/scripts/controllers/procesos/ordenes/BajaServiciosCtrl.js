(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('BajaServiciosCtrl', BajaServiciosCtrl);

  BajaServiciosCtrl.inject = ['$uibModalInstance', 'ordenesFactory', 'items', ' $rootScope'];

  function BajaServiciosCtrl($uibModalInstance, ordenesFactory, items, $rootScope) {
    var vm = this;
    vm.cancel = cancel;
    vm.transfer = transfer;
    vm.ok = ok;
    vm.titulo = '';
    vm.tituloA = '';
    vm.tituloB = '';

    this.$onInit = function () {
      console.log(items);


      var op = 0;
      if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqt')) {
        op = 1;
        vm.titulo = 'Instalación de servicios de internet';
        vm.tituloA = 'Servicios de Internet pendientes a Instalar';
        vm.tituloB = 'Instalar estos servicios de internet';
      } else if (items.descripcion.includes('bpaqu') ||
        items.descripcion.includes('bpaqt') ||
        items.descripcion.includes('bpaad') ||
        items.descripcion.includes('bsedi')) {
        vm.titulo = 'Baja de servicios de internet';
        vm.tituloA = 'Servicios de Internet Activos';
        vm.tituloB = 'Pasar a baja estos servicios de Internet';

        op = 10;
      } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
        vm.titulo = 'Desconexión de servicios de Internet';
        vm.tituloA = 'Servicios de Internet activos';
        vm.tituloB = 'Suspender estos servicios de Internet';
        op = 20;
      } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
        vm.titulo = 'Reconexión de servicios de internet';
        vm.tituloA = 'Servicios de Internet Suspendidos';
        vm.tituloB = 'Activar estos servicios de Internet';
        op = 21;
      }

      ordenesFactory.getCableModemsCli(items.contrato).then(function (data) {
        console.log(data);
        vm.cableModems = data.GetMUESTRACABLEMODEMSDELCLI_porOpcionResult;
        vm.cableModems.forEach(function (item) {

          var modem = {
            contrato: item.CONTRATONET,
            orden: items.clv_orden,
            detalle: items.clv_detalle_orden,
            op: op
          };
          ordenesFactory.detalleCableModem(modem)
            .then(function (data) {
              item.descripcion = data.GetMUESTRACONTNET_PorOpcionResult[0].DESCRIPCION;
              item.unicaNet = data.GetMUESTRACONTNET_PorOpcionResult[0].CLV_UNICANET;
              item.status = data.GetMUESTRACONTNET_PorOpcionResult[0].STATUS;
            });
        });
        vm.objModems = {
          labelAll: 'Servicios De Internet Activos',
          labelSelected: 'Pasar a Baja Estos Servicios De Internet',
          items: vm.cableModems,
          selectedItems: []
        };
      });
    

    ordenesFactory.GetMUESTRAIPAQU_porSOL(items.clv_detalle_orden,items.clv_orden).then(function(data){


    });
       
    

    }

    function transfer(from, to, index) {
      if (index >= 0) {
        to.push(from[index]);
        from.splice(index, 1);
      } else {
        for (var i = 0; i < from.length; i++) {
          to.push(from[i]);
        }
        from.length = 0;
      }
    }

    function ok() {
      var AddIPAQ = false;
      var AddIPAQUD = false;
      if (items.descripcion.includes('ipaqu') ||
        items.descripcion.includes('bpaqu') ||
        items.descripcion.includes('dpaqu') ||
        items.descripcion.includes('rpaqu') ||
        items.descripcion.includes('ipaqut') ||
        items.descripcion.includes('bpaqt') ||
        items.descripcion.includes('dpaqt') ||
        items.descripcion.includes('rpaqt') ||
        items.descripcion.includes('bpaad')) {
        AddIPAQ = true;
      } else {
        AddIPAQUD = true;
      }

      if (items.descripcion.includes('ipaqu') ||
        items.descripcion.includes('ipaqut') ||
        items.descripcion.includes('ipaqud')) {
        vm.status = 'I';
      } else if (items.descripcion.includes('bpaqu') ||
        items.descripcion.includes('bpaqt') ||
        items.descripcion.includes('bpaad') ||
        items.descripcion.includes('bpaqd')
      ) {
        vm.status = 'B';
      } else if (items.descripcion.includes('dpaqu') ||
        items.descripcion.includes('dpaqt') ||
        items.descripcion.includes('dpaqd')
      ) {
        vm.status = 'S';
      } else if (items.descripcion.includes('rpaqu') ||
        items.descripcion.includes('rpaqt') ||
        items.descripcion.includes('rpaqd')
      ) {
        vm.status = 'I';
      }




      vm.objModems.selectedItems.forEach(function (element) {
        if (element.unicaNet > 0) {
          var obj = {
            'objIPAQU': {
              'Clave': items.clv_detalle_orden,
              'Clv_Orden': items.clv_orden,
              'Contratonet': element.CONTRATONET,
              'Clv_UnicaNet': element.unicaNet,
              'Op': 0,
              'Status': vm.status
            }
          };

          if (AddIPAQUD == true) {

            ordenesFactory.AddIPAQUD(obj).then(function (data) {
              if (vm.status == 'B') {
                var orden = {
                  'Clv_Orden': items.clv_orden,
                  'Clv_TipSer': items.servicio.clv_tipser,
                  'ContratoNet': element.CONTRATONET,
                  'Clv_UnicaNet': element.unicaNet,
                  'Op': 0
                };
                ordenesFactory.guardaMotivoCancelacion(orden).then(function () {
                  $uibModalInstance.dismiss('cancel');
                  $rootScope.$emit('actualiza_tablaServicios');
                });

              }
            });
          } else {

            ordenesFactory.addIpaqu(obj).then(function (data) {
              if (vm.status == 'B') {
                var orden = {
                  'Clv_Orden': items.clv_orden,
                  'Clv_TipSer': items.servicio.clv_tipser,
                  'ContratoNet': element.CONTRATONET,
                  'Clv_UnicaNet': element.unicaNet,
                  'Op': 0
                };
                ordenesFactory.guardaMotivoCancelacion(orden).then(function () {
                  $uibModalInstance.dismiss('cancel');
                  $rootScope.$emit('actualiza_tablaServicios');
                });

              }
            });

          }



        } else {
          if (element.CONTRATONET > 0) {
            if (items.descripcion.includes('ipaqu') || items.descripcion.includes('ipaqut')) {
              console.log('ipaqu');
            } else if (items.descripcion.includes('bpaqu') || items.descripcion.includes('bpaqt') || items.descripcion.includes('bpaad') || items.descripcion.includes('bsedi')) {
              console.log('bpaqu');
            } else if (items.descripcion.includes('dpaqu') || items.descripcion.includes('dpaqt')) {
              console.log('dpaqu');
            } else if (items.descripcion.includes('rpaqu') || items.descripcion.includes('rpaqt')) {
              console.log('rpaqu');
            }
          }
        }
      });

      vm.objModems.items.forEach(function (element) {
        var delobj = {
          'Clave': items.clv_detalle_orden,
          'Clv_Orden': items.clv_orden,
          'Contratonet': element.CONTRATONET,
          'Clv_UnicaNet': element.unicaNet,
          'Op': 0
        };

        if (AddIPAQUD == true) {
          ordenesFactory.DeleteIPAQUD(delobj).then(function (data) {
            ordenesFactory.GetBorraMotivoCanServ2.then(function (result) {

            });
          });
        } else {
          ordenesFactory.DeleteIPAQU(delobj).then(function (data) {
            ordenesFactory.GetBorraMotivoCanServ2.then(function (result) {

            });
          });
        }
      });



    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
