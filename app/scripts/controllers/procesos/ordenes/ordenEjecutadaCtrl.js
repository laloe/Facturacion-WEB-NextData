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
        vm.status = 'E';
        vm.fecha = new Date();
        vm.observaciones = '';
        vm.detalleTrabajo = detalleTrabajo;
        vm.clv_tecnico = 0;
        vm.titulo = 'Orden Ejecutada'
        vm.claveOrden = $stateParams.claveOr;
        vm.blockBotonBuscar = true;
        vm.blockContrato = true;
        vm.blockFolio = true;
        vm.blockAgregar = true;
        vm.blockEliminar = true;
        vm.blockSolicitud = true;
        vm.blockEjecucion = false;
        vm.blockVista1 = true;
        vm.blockVista2 = true;
        vm.blockEjecucionReal = true;
        vm.blockEjecutada = false;
        vm.blockPendiente = true;
        vm.blockVista = false;
        vm.blockTecnico = false;
        init(vm.claveOrden);

        function init(orden) {
            ordenesFactory.ConsultaOrdSer(orden).then(function (data) {
                vm.clv_orden = data.GetDeepConsultaOrdSerResult.Clv_Orden;
                vm.contrato = data.GetDeepConsultaOrdSerResult.ContratoCom;
                ordenesFactory.consultaTablaServicios(vm.clv_orden).then(function (data) {
                    vm.trabajosTabla = data.GetBUSCADetOrdSerListResult;
                });
                buscarContrato(vm.contrato);
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
    }
})();
