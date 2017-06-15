(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('OrdenNuevaCtrl', OrdenNuevaCtrl);

  OrdenNuevaCtrl.inject = ['$state', 'ngNotify', '$stateParams', '$uibModal', 'ordenesFactory', '$rootScope', '$filter'];

  function OrdenNuevaCtrl($state, ngNotify, $stateParams, $uibModal, ordenesFactory, $rootScope, $filter) {
    var vm = this;
    vm.showDatosCliente = true;
    vm.agregar = agregar;
    vm.buscarContrato = buscarContrato;
    vm.buscarCliente = buscarCliente;
    vm.status = 'P';
    vm.fecha = new Date();
    vm.observaciones = '';
    vm.detalleTrabajo = detalleTrabajo;
    vm.clv_orden = 0;
    vm.clv_tecnico = 0;
    vm.Guardar = Guardar;
    vm.blockTecnico = true;
    vm.blockPendiente = true;
    vm.blockEjecutada = true;
    vm.blockVista = true;
    vm.blockSolicitud = true;
    vm.blockEjecucion = true;
    vm.blockVista1 = true;
    vm.blockVista2 = true;
    vm.blockEjecucionReal = true;


    function ImprimeOrden(clv_orden) {
      alert(clv_orden);
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/modalReporteOrdSer.html',
        controller: 'modalReporteOrdeSerCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        class: 'modal-backdrop fade',
        size: 'lg',
        resolve: {
          clv_orden: function () {
            return clv_orden;
          }
        }
      });
    }

    function GuardaDetalle() {
      ordenesFactory.AddNueRelOrdenUsuario(vm.clv_orden).then(function (data) {
        
        var fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
        var obj = {
          'ClvOrden': vm.clv_orden,
          'ClvTipSer': vm.clv_servicio_cliente,
          'Contrato': vm.contratoBueno,
          'FecSol': fecha,
          'FecEje': '',
          'Visita1': '',
          'Visita2': '',
          'Status': 'P',
          'ClvTecnico': 0,
          'Impresa': 1,
          'ClvFactura': 0,
          'Obs': vm.observaciones,
          'ListadeArticulos': ''
        };
        ordenesFactory.MODORDSER(obj).then(function (response) {
          
          if (response.GetDeepMODORDSERResult.Msj != null) {
            ngNotify.set(response.GetDeepMODORDSERResult.Msj, 'error');
          } else {

            ordenesFactory.PreejecutaOrden(vm.clv_orden).then(function (details) {
             
              ordenesFactory.GetDeepSP_GuardaOrdSerAparatos(vm.clv_orden).then(function (result) {
                var descripcion = 'Se generó la';

                ordenesFactory.AddSP_LLena_Bitacora_Ordenes(descripcion, vm.clv_orden).then(function (data) {
                  ordenesFactory.Imprime_Orden(vm.clv_orden).then(function (data) {
                    if (data.GetDeepImprime_OrdenResult.Imprime == 1) {
                      ngNotify.set('La orden es de proceso automático por lo cual no se imprimió', 'error');
                    } else {
                      alert('se imprimira');
                      ImprimeOrden(vm.clv_orden);
                    }

                  })
                });

              });
            });
          }
        });
      });
    }




    function Guardar() {
    
      // ngNotify.set('No hay conceptos en el detalle de la orden', 'error')
      ordenesFactory.GetDime_Que_servicio_Tiene_cliente(vm.contratoBueno).then(function (response) {
       
        vm.clv_servicio_cliente = response.GetDime_Que_servicio_Tiene_clienteResult.clv_tipser;

        ordenesFactory.GetuspContratoServList(vm.contratoBueno, vm.clv_servicio_cliente).then(function (data) {
          
          if (data.GetuspContratoServListResult[0].Pasa == true) {
            var fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');

            ordenesFactory.GetValida_DetOrden(vm.clv_orden).then(function (response) {
             
              if (response.GetValida_DetOrdenResult.Validacion == 0) {
                ngNotify.set('Se requiere tener datos en el detalle de la orden', 'error');
              } else {
                ordenesFactory.GetCheca_si_tiene_camdo(vm.clv_orden).then(function (camdo) {
                 
                  if (camdo.GetCheca_si_tiene_camdoResult.Error > 0) {
                    ngNotify.set('Se requiere que capture el nuevo domicilio', 'error');
                  } else {

                    ordenesFactory.GetChecaMotivoCanServ(vm.clv_orden).then(function (result) {
                     
                      if (result.GetChecaMotivoCanServResult.Res == 1) {

                        var modalInstance = $uibModal.open({
                          animation: true,
                          ariaLabelledBy: 'modal-title',
                          ariaDescribedBy: 'modal-body',
                          templateUrl: 'views/corporativa/modalMotivoCanMaestro.html',
                          controller: 'modalMotivoCanCtrl',
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



                      } else {
                        GuardaDetalle();
                      }
                    });

                    /*ordenesFactory.AddCambia_Tipo_cablemodem(vm.clv_orden).then(function(result){
                        
                    });*/

                  }
                });
              }

            });


          } else {
            ngNotify.set('El cliente no tiene contratado el servicio, seleccione otro tipo por favor', 'error');
          }

        });
      });


    }



    function agregar() {
      if (vm.contratoBueno == undefined || vm.contratoBueno == '') {
        ngNotify.set('Seleccione un cliente válido.', 'error')
      } else {

        var fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
        var orden = {
          contrato: vm.contratoBueno,
          fecha: fecha,
          observaciones: vm.observaciones
        };
        if (vm.clv_orden == 0) {
          ordenesFactory.addOrdenServicio(orden).then(function (data) {
            vm.clv_orden = data.AddOrdSerResult;
            var items = {
              contrato: vm.contratoBueno,
              clv_orden: vm.clv_orden,
              clv_tecnico: vm.clv_tecnico
            };


            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/procesos/ModalAgregarServicio.html',
              controller: 'ModalAgregarServicioCtrl',
              controllerAs: '$ctrl',
              backdrop: 'static',
              keyboard: false,
              size: 'md',
              resolve: {
                items: function () {
                  return items;
                }
              }
            });
          });
        } else {

          var items = {
            contrato: vm.contratoBueno,
            clv_orden: vm.clv_orden,
            clv_tecnico: vm.clv_tecnico
          };


          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/procesos/ModalAgregarServicio.html',
            controller: 'ModalAgregarServicioCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            resolve: {
              items: function () {
                return items;
              }
            }
          });

        }




      }
    }

    function buscarContrato(event) {
      vm.clv_orden = '';
      if (vm.contrato == null || vm.contrato == '' || vm.contrato == undefined) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }
      if (!vm.contrato.includes('-')) {
        ngNotify.set('Coloque un contrato válido', 'error');
        return;
      }

      ordenesFactory.getContratoReal(vm.contrato).then(function (data) {
       
        if (data.GetuspBuscaContratoSeparado2ListResult.length > 0) {
          vm.contratoBueno = data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno;
          datosContrato(data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno);
        } else {
          vm.servicios = '';
          vm.datosCli = '';
          new PNotify({
            title: 'Sin Resultados',
            type: 'error',
            text: 'No se encontro resultados con ese contrato.',
            hide: true
          });
          vm.contratoBueno = '';
          vm.clv_orden = '';
        }
      });
    }

    $rootScope.$on('cliente_select', function (e, contrato) {
     
      vm.contrato = contrato.CONTRATO;
      vm.contratoBueno = contrato.ContratoBueno;
      datosContrato(contrato.ContratoBueno);
    });


    $rootScope.$on('detalle_orden', function (e, detalle) {
      vm.clv_detalle = detalle;
    });

    $rootScope.$on('actualiza_tablaServicios', function () {
      alert('actualiza');
      actualizarTablaServicios();
    });

    function actualizarTablaServicios() {
      ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
        console.log(data);
        vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
      });
    }

    function datosContrato(contrato) {
      ordenesFactory.serviciosCliente(contrato).then(function (data) {
        vm.servicios = data.GetDameSerDelCliFacListResult;
       
      });
      ordenesFactory.buscarCliPorContrato(contrato).then(function (data) {
        vm.datosCli = data.GetDeepBUSCLIPORCONTRATO_OrdSerResult;
      });
    }

    function buscarCliente() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/procesos/buscarCliente.html',
        controller: 'BuscarNuevoCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'lg'
      });
    }

    function detalleTrabajo(trabajo,x) {
      console.log(trabajo);
      console.log(x);
       
       ordenesFactory.GetDime_Que_servicio_Tiene_cliente(vm.contratoBueno).then(function (response) {
      
       var items={};
       items.contrato=vm.contratoBueno;
        vm.clv_servicio_cliente = response.GetDime_Que_servicio_Tiene_clienteResult.clv_tipser;
        if (x.Descripcion.toLowerCase().includes('ipaqu') ||
              x.Descripcion.toLowerCase().includes('bpaqu') ||
              x.Descripcion.toLowerCase().includes('dpaqu') ||
              x.Descripcion.toLowerCase().includes('rpaqu') ||
              x.Descripcion.toLowerCase().includes('ipaqut') ||
              x.Descripcion.toLowerCase().includes('bpaqt') ||
              x.Descripcion.toLowerCase().includes('dpaqt') ||
              x.Descripcion.toLowerCase().includes('rpaqt') ||
              x.Descripcion.toLowerCase().includes('bpaad') ||
              x.Descripcion.toLowerCase().includes('bsedi')) {
              items.clv_detalle_orden = x.Clave;
              items.clv_orden=x.Clv_Orden;
              items.descripcion = x.Descripcion.toLowerCase();
              items.servicio = vm.clv_servicio_cliente;
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
            }
       });
      

      


      /*switch (trabajo) {
        case 'Domicilio':
          ordenesFactory.consultaCambioDomicilio(vm.clv_detalle, vm.clv_orden, vm.contratoBueno).then(function (data) {
            var items = {
              clv_detalle_orden: vm.clv_detalle,
              clv_orden: vm.clv_orden,
              contrato: vm.contratoBueno,
              isUpdate: true,
              datosCamdo: data.GetDeepCAMDOResult
            };
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
          });
          break;

        default:
          break;
      }*/
    }





    
  }
})();
