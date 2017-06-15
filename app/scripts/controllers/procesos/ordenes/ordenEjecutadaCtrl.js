(function () {
    'use strict';

    angular
        .module('softvApp')
        .controller('ordenEjecutadaCtrl', ordenEjecutadaCtrl);

    ordenEjecutadaCtrl.inject = ['$state', 'ngNotify', '$stateParams', '$uibModal', 'ordenesFactory', '$rootScope', '$filter'];

    function ordenEjecutadaCtrl($state, ngNotify, $stateParams, $uibModal, ordenesFactory, $rootScope, $filter) {
        var vm = this;
        vm.showDatosCliente = true;
        vm.buscarContrato = buscarContrato;
        vm.fechaEjecucion = new Date();
        vm.observaciones = '';
        vm.detalleTrabajo = detalleTrabajo;
        vm.guardar = guardar;
        vm.clv_tecnico = 0;
        vm.titulo = 'Orden Ejecutada'
        vm.claveOrden = $stateParams.claveOr;
        vm.block = true;
        vm.blockSolicitud = true;
        vm.blockEjecucion = true;
        vm.blockVista1 = true;
        vm.blockVista2 = true;
        vm.blockEjecucionReal = true;
        vm.blockEjecutada = false;
        vm.blockPendiente = true;
        vm.blockVista = false;
        vm.blockTecnico = false;
        vm.fechas = fechas;
        init(vm.claveOrden);

        function init(orden) {
            ordenesFactory.ConsultaOrdSer(orden).then(function (data) {
                vm.datosOrden = data.GetDeepConsultaOrdSerResult;
                console.log(vm.datosOrden);
                vm.clv_orden = data.GetDeepConsultaOrdSerResult.Clv_Orden;
                vm.contrato = data.GetDeepConsultaOrdSerResult.ContratoCom;
                vm.status = data.GetDeepConsultaOrdSerResult.STATUS;
                ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
                    vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
                });
                buscarContrato(vm.contrato);
                if (vm.datosOrden.Fec_Eje != '01/01/1900') {
                    vm.Fec_Eje = vm.datosOrden.Fec_Eje;
                } if (vm.datosOrden.Visita1 != '01/01/1900') {
                    vm.Visita1 = vm.datosOrden.Visita1;
                } if (vm.datosOrden.Visita2 != '01/01/1900') {
                    vm.Visita2 = vm.datosOrden.Visita2;
                } if (vm.status == 'E') {
                    vm.blockEjecutada = true;
                    vm.blockPendiente = true;
                    vm.blockVista = true;
                }
            });
            ordenesFactory.MuestraRelOrdenesTecnicos(orden).then(function (data) {
                vm.tecnico = data.GetMuestraRelOrdenesTecnicosListResult;
            });
        }

        function buscarContrato(event) {
            if (vm.contrato == null || vm.contrato == '' || vm.contrato == undefined) {
                ngNotify.set('Coloque un contrato válido', 'error');
                return;
            }
            if (!vm.contrato.includes('-')) {
                ngNotify.set('Coloque un contrato válido', 'error');
                return;
            }

            ordenesFactory.getContratoReal(vm.contrato).then(function (data) {
                vm.contratoBueno = data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno;
                datosContrato(data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno);
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
            actualizarTablaServicios();
        });

        function actualizarTablaServicios() {
            ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
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

        function detalleTrabajo(trabajo) {
            switch (trabajo) {
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
            }
        }

        function fechas() {
            if (vm.status == 'E') {
                vm.blockVista1 = true;
                vm.blockVista2 = true;
                vm.blockEjecucion = false;
            } else {
                vm.blockEjecucion = true;
                vm.blockVista1 = false;
                vm.blockVista2 = false;
            }
        }

        function guardar() {
            if (vm.selectedTecnico == undefined) {
                ngNotify.set('Selecciona un técnico.', 'error');
            } else if (vm.Fec_Eje == '01/01/1900') {
                ngNotify.set('Ingresa la fecha de ejecución.', 'error');
            }
        }
    }
})();
